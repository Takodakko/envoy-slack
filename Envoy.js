require('dotenv').config();

class Envoy {
    constructor(accessToken = process.env.ENVOY_API_PRIV_TOKEN, xEnvoyContext = {}) {
      this.accessToken = accessToken;
      this.request = request.defaults({
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
          'X-Envoy-Context': JSON.stringify(xEnvoyContext),
        },
        json: true,
        baseUrl: process.env.ENVOY_BASE_URL || 'https://app.envoy.com',
      });
    }

};

module.exports = Envoy;