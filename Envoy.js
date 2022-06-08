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
    
    request(options, async function (error, response) {
        if (error) throw new Error(error);
        accessToken = JSON.parse(response.body).access_token;
        console.log(accessToken, 'I am an access token!');
        await function() {
            envoyAPI = new EnvoyAPI(accessToken);
            
        }
        
    });
  return envoyAPI;
}

// getAccessToken();
// console.log(getAccessToken(), 'envoyAPI in Envoy.js');
module.exports = getAccessToken;