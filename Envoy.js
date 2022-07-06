require('dotenv').config();
const request = require('request');
const { middleware, errorMiddleware, asyncHandler, EnvoyResponseError, EnvoyAPI } = require('@envoy/envoy-integrations-sdk');

// let accessToken = '';
// let envoyAPI = {};
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
// ].join();

// class Envoy {
//     constructor(accessToken = process.env.ENVOY_API_PRIV_TOKEN, xEnvoyContext = {}) {
//       this.accessToken = accessToken;
//       this.request = request.defaults({
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/vnd.api+json',
//           Accept: 'application/vnd.api+json',
//           'X-Envoy-Context': JSON.stringify(xEnvoyContext),
//         },
//         json: true,
//         baseUrl: process.env.ENVOY_BASE_URL || 'https://app.envoy.com',
//       });
//     }
// };
let accessToken = '';
let refreshToken = '';
async function getAccessToken() {
    
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
        },
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        accessToken = JSON.parse(response.body).access_token;
        refreshToken = JSON.parse(response.body).refresh_token;
        //console.log('access token: ', accessToken);
        //console.log('refresh token: ', refreshToken); 
    });
}
getAccessToken();
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

    static getInstance ({context, next}) {
        if (!Envoy.instance){
            Envoy.instance = new PrivateEnvoy();
        }
        context.envoy = Envoy.instance;
        next();
    }
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
