const request = require('request-promise-native');
const axios = require('axios').default;

class EnvoyClient {
    constructor(accessToken, xEnvoyContext = {}){
        this.accessToken = accessToken;
        this.request = request.defaults({
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/vnd.api+json',
              Accept: 'application/vnd.api+json',
              'X-Envoy-Context': JSON.stringify(xEnvoyContext),
            },
            json: true,
            baseUrl: 'https://api.envoy.com',
          });
    }

    async getLocations() {
        // const { data } = await this.request({
        //   url: '/rest/v1/locations/',
        // });
        // return data;
        let data
        axios({
            method: 'GET',
            url: 'https://api.envoy.com/rest/v1/locations',
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            },
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
      }

}


module.exports = { EnvoyClient }