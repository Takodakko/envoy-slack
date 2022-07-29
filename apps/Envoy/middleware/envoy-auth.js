const { redisClient, 
    refreshTokenExists,
    accessTokenExists, 
    getAll,
    getRefreshExp,
    getAccessExp,
    getRefreshToken,
    getAccessToken
 } = require('../util/RedisClient');
 const { encrypt, decrypt } = require('../util/crypto');
 const axios = require('axios')

const request = require("request");
require('dotenv').config();

const authWithEnvoy = async ({
    client,
    payload,
    context = {},
    next,
    body,
    slackUserEmail
} = {}) => {
    console.log('Executing Envoy auth middleware');
    console.log(slackUserEmail)
    if (!slackUserEmail) {
        console.log("NO EMAIL")
        // For all events Slack returns the users Email as user.profile.email
        if (payload?.user?.profile?.email) {
            slackUserEmail = payload.user.email;
            console.log(slackUserEmail, "payload-user-profile-email")
        } else if (payload?.user) {
            // For Home Event payload.user gives the Id
            const userInfo = await client.users.info({user: payload.user})
            slackUserEmail = userInfo.user.profile.email;
            console.log(slackUserEmail, "payload-user")
        } else if (body?.user?.id) {
            // For Views Listener Event, we retrieve it from the Body
            const userInfo = await client.users.info({user: body.user.id})
            console.log(userInfo.user.profile.email)
            slackUserEmail = userInfo.user.profile.email;
            console.log("body-user")
        }
    }
    console.log(slackUserEmail)
    try {
        let authInfo = {};
        // User authorized and tokens are cached
        if (await accessTokenExists(slackUserEmail)) {
            console.log('Tokens are cached');
            authInfo.accessTokenExp = await getAccessExp(slackUserEmail);
            if(authInfo.accessTokenExp <= Date.now()){
                console.log("EXPIRED TOKS")
                console.log(authInfo.accessTokenExp, 'authInfo.accessTokenExp');
                authInfo.refreshToken = decrypt(await getRefreshToken(slackUserEmail));
                console.log(authInfo.refreshToken)
                const newAuth = await _refreshTokens(authInfo.refreshToken);
                
                console.log(newAuth)
                console.log("REFRESHED")
            }
            authInfo.accessToken = decrypt(await getAccessToken(slackUserEmail));
            console.log(authInfo.accessToken, "AUTHED")
            context.hasAuthorized = true;
            context.authInfo = authInfo;
            
        } else {
            console.log("NOT AUTHED")
            context.hasAuthorized = false;
        }
    } catch (e) {
        console.error(e);
        throw new Error(e.message);
    }
    if (next) {
        // Middleware has been invoked regularly
        console.log("NEXT")
        await next();
    }
    return context;
}

const _refreshTokens = async (
    refreshToken,
    clientID = process.env.ENVOY_CLIENT_ID,
	clientSecret = process.env.ENVOY_CLIENT_SECRET
) => {
    let headers = {
		"Content-Type": "application/json",
	};

	let dataString = JSON.stringify({
		grant_type: "refresh_token",
		refresh_token: refreshToken,
		client_id: clientID,
		client_secret: clientSecret,
	});

	let options = {
		url: "https://api.envoy.com/oauth2/token",
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

            let accessTokenExp = Date.now() + JSON.parse(response.body).expires_in;
            let refreshTokenExp = Date.now() + JSON.parse(response.body).refresh_token_expires_in;
			resolve({ accessToken, refreshToken, accessTokenExp, refreshTokenExp });
		});
	});
}

module.exports = { authWithEnvoy }
