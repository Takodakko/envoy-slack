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
    // console.log('Executing Envoy auth middleware');
    // console.log(slackUserEmail)
    if (!slackUserEmail) {
        // console.log("NO EMAIL")
        // For all events Slack returns the users Email as user.profile.email
        if (payload?.user?.profile?.email) {
            slackUserEmail = payload.user.email;
            // console.log("payload-user-profile-email")
        } else if (payload?.user) {
            // For Home Event payload.user gives the Id
            const userInfo = await client.users.info({user: payload.user})
            slackUserEmail = userInfo.user.profile.email;
            // console.log("payload-user")
        } else if (body?.user?.id) {
            // For Views Listener Event, we retrieve it from the Body
            const userInfo = await client.users.info({user: body.user.id})
            // console.log(userInfo.user.profile.email)
            slackUserEmail = userInfo.user.profile.email;
            // console.log("body-user")
        }
    }
    // console.log(slackUserEmail)
    try {
        let authInfo = {};
        // User authorized and tokens are cached
        if (await accessTokenExists(slackUserEmail)) {
            // console.log('Tokens are cached');
            console.log(slackUserEmail, 'slackUserEmail');
            authInfo.accessExpTime = await getAccessExp(slackUserEmail);
            console.log(authInfo.accessExpTime, 'authInfo.accessExpTime');
            if(authInfo.accessExpTime <= Date.now()){
                // console.log("EXPIRED TOKS")
                authInfo.refreshToken = decrypt(await getRefreshToken(slackUserEmail));
                console.log(authInfo.refreshToken, 'authInfo.refreshToken');
                authInfo = await _refreshTokens(authInfo.refreshToken);
                console.log("AUTHINFO = ")
                console.log(authInfo)
                redisClient.hSet(slackUserEmail,
                    'accessToken', encrypt(authInfo.accessToken),
                    'refreshToken', encrypt(authInfo.refreshToken),
                    'refreshExpTime', authInfo.refreshExpTime,
                    'accessExpTime', authInfo.accessExpTime
                )
                redisClient.expireAt(slackUserEmail, authInfo.refreshExpTime);
                // console.log("REFRESHED")
                // console.log("NEW EXPIRE DATE IS " + authInfo.refreshExpTime)
            }  
            authInfo = {
                accessToken: decrypt(await getAccessToken(slackUserEmail)),
                refreshToken: decrypt(await getRefreshToken(slackUserEmail)),
            }
            console.log("AUTHED", authInfo);
            context.authInfo = authInfo;  
            context.hasAuthorized = true;
        } else {
            // console.log("NOT AUTHED")
            context.hasAuthorized = false;
        }
        context.authInfo = authInfo;
    } catch (e) {
        console.error(e);
        throw new Error(e.message);
    }
    if (next) {
        // Middleware has been invoked regularly
        // console.log("NEXT")
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
		url: `${process.env.ENVOY_AUTH_URL}`,
		method: "POST",
		headers: headers,
		body: dataString,
	};

    return new Promise((resolve, reject) => {
		request(options, async (error, response) => {
			if (error) throw new Error(error);
            let body = JSON.parse(response.body);
			let accessToken = body.access_token;
			let refreshToken = body.refresh_token;
            let refreshExpTime = Date.now() + body.refresh_token_expires_in;
            let accessExpTime = Date.now() + body.expires_in;
			resolve({ accessToken, refreshToken, refreshExpTime, accessExpTime });
		});
	});
}

module.exports = { authWithEnvoy }
