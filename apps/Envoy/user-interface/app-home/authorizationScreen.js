const { encrypt, decrypt } = require('../../util/crypto');

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
                    "url": `${process.env.NGROK_URL}/oauthstart/${slackUserEmail}&${slackUserId}` //encrypt these
                }
                ]
            }
        ]
    }
    return authView
}

module.exports = { authorizationScreen }

// https://miguel-envoy.ngrok.io/oauthstart/4726b2ec173bef09a25b85412ff1e817f7930cd9cc5385147157e4bda85927ac&50c94c655d9c81359f7f12c8eb00234b1817ec04b503e6b60cbfff