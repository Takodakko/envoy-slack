const url = require('url');
const fs = require('fs');
const path = require('path');
const request = require('request');
require('dotenv').config();
const { redisClient } = require('../util/RedisClient');
const { encrypt, decrypt } = require('../util/crypto');
const persistedClient = require('../util/boltWebClient');
const { authWithEnvoy } = require('../middleware/envoy-auth.js');
const { appHomeOpenedCallback } = require('../listeners/events/app-home-opened.js');
// const TOKEN_SCOPE = [
//     'token.refresh', 
//     'locations.read', 
//     'companies.read',
//     'flows.read',
//     'invites.read',
//     'invites.write',
//     'employees.read',
//     'reservations.read',
//     'reservations.write',
//     'work-schedules.read',
//     'work-schedules.write',
//     'sign-in-fields.read',
//     'sign-in-fields.write',
//     'sign-in-field-pages.read',
//     'badges.read'
//   ].join();
const fetchOAuthToken = async (req, res) => {
    try {
        
        // Retrieve slackEmail from session
        const slackUserEmail = decrypt(req.session.slackUserEmail);
        const slackUserId = decrypt(req.session.slackUserId);
        /*please*/ // console.log("DECRYPTED EMAIL: " + slackUserEmail)
        /*please*/ // console.log("DECRYPTED ID: " + slackUserId)
        if (slackUserEmail) {
            // Parse Authorization Code
            let code = url.parse(req.url, true).query.code;
            console.log(code, 'code');
            // Request Access and Refresh tokens
            const authInfo = await _requestAccessAndRefreshTokens(code);

            //store to db and expires at refresh token expire time.
            // console.log("storing tokens to db")
            redisClient.hSet(slackUserEmail,
                'accessToken', encrypt(authInfo.accessToken),
                'refreshToken', encrypt(authInfo.refreshToken),
                'refreshExpTime', authInfo.refreshExpTime,
                'accessExpTime', authInfo.accessExpTime
            )
            redisClient.expireAt(slackUserEmail, authInfo.refreshExpTime);
            // console.log(authInfo.refreshExpTime)

            // Force execution of auth middleware so that user to user auth
            // flow is executed and we obtain the user context")
            // console.log("FORCE MID")
            // console.log(slackUserEmail)
            const context = await authWithEnvoy({
                slackUserEmail: slackUserEmail
            });

            // Show travel requests in app home
            await appHomeOpenedCallback({
                context: context,
                client: req.webClientBot,
                slackUserEmail: slackUserEmail,
                slackUserId: slackUserId
            });


            // Send success message
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(
                fs.readFileSync(
                    path.resolve(__dirname, '../routes/oauth-success.html')
                ),
                'utf-8'
            );
        } else {
            res.writeHead(500);
            res.end(
                'Missing Slack User Id in session. Failed to connect to Envoy',
                'utf-8'
            );
        }
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Failed to connect to Envoy', 'utf-8');
    }
};

const _requestAccessAndRefreshTokens = async (code) => {
    let headers = {
		"Content-Type": "application/json",
	};

	let dataString = JSON.stringify({
		grant_type: "authorization_code",
		code: code,
		client_id: process.env.ENVOY_CLIENT_ID,
		client_secret: process.env.ENVOY_CLIENT_SECRET,
        // 'scope': TOKEN_SCOPE,
	});

	let options = {
		url: `${process.env.ENVOY_AUTH_URL}`,
        // url: `${process.env.ENVOY_BASE_URL}/a/auth/v0/token`,
		method: "POST",
		headers: headers,
		body: dataString,
	};

	return new Promise((resolve, reject) => {
		request(options, async (error, response) => {
			if (error) throw new Error(error);
			// console.log(response.body, 'body');
            let body = JSON.parse(response.body);
            
			let accessToken = body.access_token;
			let refreshToken = body.refresh_token;
            let refreshExpTime = Date.now() + body.refresh_token_expires_in;
            let accessExpTime = Date.now() + body.expires_in;
			resolve({ accessToken, refreshToken, refreshExpTime, accessExpTime });
		});
	});
};

const oauthCallback = {
    path: '/oauthcallback',
    method: ['GET'],
    handler: fetchOAuthToken
};

module.exports = { oauthCallback };
