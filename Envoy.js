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
// const getAccessToken = async function({context, next}) {
//     let accessToken = '';
//     // let envoyAPI = {};
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
//     ].join();
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
//         }
//     };
//     context.test = 'this is a test';
//     try {
//           request(options, async function (error, response) {
//             if (error) throw new Error(error);
//             accessToken = JSON.parse(response.body).access_token;
//             // console.log(accessToken, 'I am an access token!');
//             // const envoyApi = new EnvoyAPI(accessToken);
//             // context.envoyAPI = envoyApi;
//             // console.log(context.envoyAPI, 'context.envoyAPI in Envoy.js');
//         });
//         const envoyApi = new EnvoyAPI(Promise.resolve(accessToken));
//             context.envoyAPI = envoyApi;
//             console.log(context.envoyAPI, 'context.envoyAPI in Envoy.js');
//         //context.envoyAPI = new EnvoyAPI(accessToken);
//     }
//     catch(err) {
//         throw err
//     }
    
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
        
      await next();
    }
//}
async function attachEnvoy({context, next}) {
    console.log('Global Middleware 2');
  context.envoyAPI = new EnvoyAPI(context.accessToken);
  await next();
};
// const envoyApi = Promise.resolve(getAccessToken());
// console.log(envoyApi, 'envoyAPI in Envoy.js');
module.exports = {attachEnvoy, getAccessToken};