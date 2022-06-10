require('dotenv').config();
const request = require('request');
const { EnvoyAPI } = require('@envoy/envoy-integrations-sdk')

async function getAccessToken() {
    let accessToken = '';
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
        console.log(accessToken); 
    });
}

  module.exports = getAccessToken;