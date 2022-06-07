const { WebClient, LogLevel } = require('@slack/web-api');

class SlackHelper {
    constructor(botToken) {
      this.web = new WebClient(botToken, {
        logLevel: LogLevel.DEBUG,
      });
    }
    publishView = async function(userId, view) {
        return await this.web.views.publish({ user_id: userId, view: view });
      }
  };
  
  module.exports = SlackHelper;