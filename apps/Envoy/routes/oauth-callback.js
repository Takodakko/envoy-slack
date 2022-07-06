const url = require('url');
const fs = require('fs');
const path = require('path');
const persistedClient = require('../store/bolt-web-client.js');
const request = require("request");
require('dotenv').config();

/*
const { upsert } = require('../salesforce/dml/slack-authentication');
const { authWithSalesforce } = require('../middleware/salesforce-auth');
const {
    myTravelRequestsCallback
} = require('../listeners/utils/home-tab-callbacks');
*/

const fetchOAuthToken = async (req, res) => {
    console.log('Executing user to user OAuth callback');

    try {
        // Retrieve slackuserId from session
        const slackUserId = req.session.slackUserId;

        if (slackUserId) {
            // Parse Authorization Code
            let code = url.parse(req.url, true).query.code;

            // Request Access and Refresh tokens
            const authInfo = await _requestAccessAndRefreshTokens(code);
            console.log("AUTH INFO: " + authInfo)

            req.session.authInfo = authInfo
            //store to db

            // Upsert record in Salesforce
            console.log('Correctly authorized, Storying tokens in Envoy');
            /*
            await upsert(
                authInfo.connection,
                slackUserId,
                authInfo.salesforceUserId
            );
            */
            
            /*
            // Force execution of auth middleware so that user to user auth
            // flow is executed and we obtain the user context
            const context = await authWithSalesforce({
                slackUserId: slackUserId
            });

            // Show travel requests in app home
            await myTravelRequestsCallback(
                context,
                persistedClient.client,
                slackUserId
            );
            */

            console.log(req.session)

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
                'Missing Slack User Id in session. Failed to connect to Salesforce',
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
		url: "https://app.envoy.com/a/auth/v0/token",
		method: "POST",
		headers: headers,
		body: dataString,
	};

	return new Promise((resolve, reject) => {
		request(options, async (error, response) => {
			if (error) throw new Error(error);
			console.log("RES", JSON.parse(response.body));
			let accessToken = JSON.parse(response.body).access_token;
			let refreshToken = JSON.parse(response.body).refresh_token;

            //calc expiration date
            let now = new Date();
            let expirationDate = new Date(now.getTime() + ((JSON.parse(response.body).expires_in)*1000));
            let expirationTime = expirationDate.getTime();
            console.log("expiration date", expirationDate);
            console.log("expiration time", expirationTime);

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
