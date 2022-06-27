require('dotenv').config();
const request = require('request');
const { EnvoyAPI } = require('@envoy/envoy-integrations-sdk')
/**  
 * Gets access token from Envoy.
 */
async function getAccessToken() {
    let accessToken = '';
    let refreshToken = '';
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
        console.log('access token: ', accessToken);
        console.log('refresh token: ', refreshToken); 
    });
}

  module.exports = getAccessToken;