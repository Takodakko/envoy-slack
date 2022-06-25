const Envoy = require('./Envoy');

const appHomeOpenedBuilder = async function() {
  let today = new Date();
  let todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
  const homeView = {
    type: "home",
    callback_id: 'home_view',
    blocks: [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Connect to Envoy",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "To get started with the Envoy app, authorize with Envoy",
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
              "text": "Authorize with Envoy",
              "emoji": true
            },
            "value": "authorize-with-envoy",
            "action_id": "authorize-with-envoy",
            "url": `https://app.envoy.com/a/auth/v0/authorize?response_type=code&client_id=34396186-e7a7-11ec-bb27-233d2fd743dd&redirect_uri=https://miguel-envoy.ngrok.io/envoy/auth&scope=locations.read+token.refresh`
          }
        ]
      },
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Envoy Slack Integration uwu"
        }
      },
      {
        "type": "section",
        "block_id": "welcome_section",
        "text": {
          "type": "plain_text",
          "text": "Welcome to the Envoy App!"
        },
        "accessory": {
          "type": "image",
          "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Red_square.svg/640px-Red_square.svg.png",
          "alt_text": "Envoy Logo"
        }
      },
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "asd",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "block_id": "open_message",
        "text": {
          "type": "plain_text",
          "text": "Hello! I'm the Envoy Bot. I'm here to notify you of relevant events in Envoy.",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "block_id": "slash_commands",
        "text": {
          "type": "mrkdwn",
          "text": "One way you can interact with me is by sending slash commands such as */envoy-invite*."
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "block_id": "shortcuts",
        "text": {
          "type": "mrkdwn",
          "text": "You can also choose shortcuts from the *+* menu on the left of message input."
        }
      },
      {
        "type": "image",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Red_square.svg/640px-Red_square.svg.png",
        "alt_text": "inspiration"
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Make Invite",
              "emoji": true
            },
            "value": "button_invite",
            "action_id": "button_invite"
          }
        ]
      }
    ]
  };
  
  return homeView;
};

module.exports = appHomeOpenedBuilder;