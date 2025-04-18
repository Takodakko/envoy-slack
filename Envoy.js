require('dotenv').config();
const request = require('request');
const { middleware, errorMiddleware, asyncHandler, EnvoyResponseError, EnvoyAPI } = require('@envoy/envoy-integrations-sdk');
//const { refreshTokenExists, accessTokenExists, getAll, getRefreshToken, getAccessToken, getRefreshExp, getAccessExp } = require('./apps/Envoy/util/redisClient');


// let accessToken = '';
// let refreshToken = '';
// async function getAccessToken() {
    
//     const TOKEN_SCOPE = [
//         'token.refresh', 
//         'locations.read', 
//         'companies.read',
//         'flows.read',
//         'invites.read',
//         'invites.write',
//         'employees.read',
//         'reservations.read',
//         'reservations.write',
//         'work-schedules.read',
//         'work-schedules.write',
//         'sign-in-fields.read',
//         'sign-in-fields.write',
//         'sign-in-field-pages.read',
//         'badges.read'
//       ].join();
//     const options = {
//         'method': 'POST',
//         'url': 'https://api.envoy.com/oauth2/token',
//         'headers': {
//             'Authorization': 'Basic ' + process.env.ENVOY_CLIENT_API_KEY,
//             json: true
//         },
//         formData: {
//             'username': process.env.API_USERNAME,
//             'password': process.env.API_USER_PASSWORD,
//             'scope': TOKEN_SCOPE,
//             'grant_type': 'password',
//         },
//     };

//     request(options, function (error, response) {
//         if (error) throw new Error(error);
//         console.log(JSON.parse(response.body), 'getAccessToken')
//         accessToken = JSON.parse(response.body).access_token;
//         refreshToken = JSON.parse(response.body).refresh_token;
//         // console.log('access token: ', accessToken);
//         // console.log('refresh token: ', refreshToken); 
//     });
// }
// getAccessToken();


// async function checkAndGetTokens(userEmail) {
//   const currentTokenExp = await getAccessExp(userEmail);
//   const currentRefreshExp = await getRefreshExp(userEmail);
//   if (Date.now() - currentTokenExp > 0) {
//     if (Date.now() - currentRefreshExp > 0) {
//         console.log('uh-oh');
//         return;
//     } else {
//         refreshToken = await getRefreshToken(userEmail);
//     }
//   } else {
//     accessToken = await getAccessToken(userEmail);
//   }
// };


class PrivateEnvoy {
    constructor() {
        // this.API = new EnvoyAPI(process.env.ENVOY_BEARER_TOKEN);
        this.API = new EnvoyAPI(accessToken);
    }
}

class Envoy {
    constructor() {
        throw new Error('Use Envoy.getInstance()');
    }

    static getInstance () {
        if (!Envoy.instance){
            Envoy.instance = new PrivateEnvoy();
        }
        // context.envoy = Envoy.instance;
        // next();
        return Envoy.instance;
    }
    // static getSignInFieldsSpecial(flowId) {
    //     const { included } = request({
    //       url: `https://app.envoy.com/api/v3/flows/${flowId}/sign-in-field-page`,
    //       qs: {
    //         include: 'sign-in-fields',
    //       },
    //     });
    //     return included;
    //   }
}

/*
getAccessToken = async function() {
    let accessToken = '';
    let envoyAPI = {};
    const TOKEN_SCOPE = [
        'token.refresh', 
        'locations.read', 
        'companies.read',
        'flows.read',
        'invites.read',
        'invites.write',
        'employees.read',
        'reservations.read',
        'reservations.write',
        'work-schedules.read',
        'work-schedules.write',
    ].join();
    const options = {
        'method': 'POST',
        'url': 'https://api.envoy.com/oauth2/token',
        'headers': {
            'Authorization': 'Basic ' + process.env.ENVOY_CLIENT_API_KEY,
            json: true
        },
        formData: {
            'username': process.env.API_USERNAME,
            'password': process.env.API_USER_PASSWORD,
            'scope': TOKEN_SCOPE,
            'grant_type': 'password',
        }
    };
    
//   await next();
// }

// class Envoy {
//     constructor(test) {
//       this.test = test
//     }
    const getAccessToken = async function({context, next}) {
        // let accessToken = '';
        // let envoyAPI = {};
        console.log('Global Middleware 1');
        const TOKEN_SCOPE = [
            'token.refresh', 
            'locations.read', 
            'companies.read',
            'flows.read',
            'invites.read',
            'invites.write',
            'employees.read',
            'reservations.read',
            'reservations.write',
            'work-schedules.read',
            'work-schedules.write',
        ].join();
        const options = {
            'method': 'POST',
            'url': 'https://api.envoy.com/oauth2/token',
            'headers': {
                'Authorization': 'Basic ' + process.env.ENVOY_CLIENT_API_KEY,
                json: true
            },
            formData: {
                'username': process.env.API_USERNAME,
                'password': process.env.API_USER_PASSWORD,
                'scope': TOKEN_SCOPE,
                'grant_type': 'password',
            }
        };
        // context.test = 'this is a test';
        try {
              request(options, async function (error, response) {
                if (error) throw new Error(error);
                let accessToken = await JSON.parse(response.body).access_token;
                console.log(accessToken, 'I am an access token!');
                // const envoyApi = new EnvoyAPI(accessToken);
                // context.envoyAPI = envoyApi;
                context.accessToken = accessToken;
                // console.log(context.envoyAPI, 'context.envoyAPI in Envoy.js');
            });
            // context.accessToken = accessToken;
            // const envoyApi = new EnvoyAPI(accessToken);
                // context.envoyAPI = envoyApi;
                //console.log(context.envoyAPI, 'context.envoyAPI in Envoy.js');
            //return envoyApi;
        }
        catch(err) {
            throw err
        }
        
    });
  return envoyAPI;
}
*/

//module.exports = getAccessToken;
module.exports = Envoy;
