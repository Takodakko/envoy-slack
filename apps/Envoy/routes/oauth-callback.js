const url = require('url');
const fs = require('fs');
const path = require('path');
const persistedClient = require('../store/bolt-web-client.js');
const request = require('request');
require('dotenv').config();
const { redisClient } = require('../util/RedisClient')
const { encryptToken, decrypToken } = require('../util/crypto');
/*
const { upsert } = require('../salesforce/dml/slack-authentication');
const { authWithSalesforce } = require('../middleware/salesforce-auth');
const {
    myTravelRequestsCallback
} = require('../listeners/utils/home-tab-callbacks');
*/

const fetchOAuthToken = async (req, res) => {
    // console.log('Executing user to user OAuth callback');
    // console.log(req.session);
    try {
        // Retrieve slackEmail from session
        const slackUserEmail = req.session.slackUserEmail;

        if (slackUserEmail) {
            // Parse Authorization Code
            let code = url.parse(req.url, true).query.code;

            // Request Access and Refresh tokens
            const authInfo = await _requestAccessAndRefreshTokens(code);
            console.log("AUTH INFO: ")
            console.log(authInfo)

            req.session.authInfo = authInfo

            //store to db and expires at refresh token expire time.
            console.log("storing tokens to db")
            redisClient.hSet(slackUserEmail,
                'accessToken', encryptToken(authInfo.accessToken),
                'refreshToken', encryptToken(authInfo.refreshToken),
                'refreshTokenExp', authInfo.expirationTime,
            )
            redisClient.expireAt(slackUserEmail, authInfo.expirationTime);

            console.log(await redisClient.hGet(slackUserEmail, 'accessToken'))

            // Upsert record in Envoy
            console.log('Correctly authorized, Storying tokens in Envoy');

            // Do this?  Use session object?
            // const context = await authWithEnvoy({
            //     slackEmail: slackEmail,
            //     authInfo: authInfo
            // });
            // console.log(context, 'context in oauth-callback');

            // Show travel requests in app home
            // await myTravelRequestsCallback(
            //     context,
            //     persistedClient.client,
            //     slackEmail
            // );
            

            //console.log(req.session)

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
		client_secret: process.env.ENVOY_CLIENT_SECRET
	});

	let options = {
		url: `${process.env.ENVOY_LOGIN_URL}/a/auth/v0/token`,
		method: "POST",
		headers: headers,
		body: dataString,
	};

	return new Promise((resolve, reject) => {
		request(options, async (error, response) => {
			if (error) throw new Error(error);
			let accessToken = JSON.parse(response.body).access_token;
			let refreshToken = JSON.parse(response.body).refresh_token;

            //calc expiration date
            let now = new Date();
            let expirationDate = new Date(now.getTime() + ((JSON.parse(response.body).expires_in)*1000));
            let expirationTime = expirationDate.getTime();
            // console.log("expiration date", expirationDate);
            // console.log("expiration time", expirationTime);

			resolve({ accessToken, refreshToken, expirationTime });
		});
	});
};

const oauthCallback = {
    path: '/oauthcallback',
    method: ['GET'],
    handler: fetchOAuthToken
};

module.exports = { oauthCallback };
