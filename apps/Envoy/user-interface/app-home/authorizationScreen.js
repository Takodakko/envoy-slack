const { encrypt } = require('../../util/crypto');

/**
 * @TODO
 * Build logic and implement authScreen
 */
const authorizationScreen = (slackUserEmail, slackUserId) => {
    const authView = {
        type: "home",
        callback_id: 'home_view',
        blocks: [
            {
                "type": "header",
                "text": {
                "type": "plain_text",
                "text": "Authorize with Envoy",
                "emoji": true
                }
            },
            {
                "type": "actions",
                "elements": [
                {
                    "type": "button",
                    "text": {
                    "type": "plain_text",
                    "text": "Authorize",
                    "emoji": true
                    },
                    "value": "authorize-btn",
                    "action_id": "authorize-btn",
                    "url": `${process.env.NGROK_URL}/oauthstart/${encrypt(slackUserEmail)}&${encrypt(slackUserId)}` //encrypt these
                }
                ]
            }
        ]
    }
    return authView
}

module.exports = { authorizationScreen }