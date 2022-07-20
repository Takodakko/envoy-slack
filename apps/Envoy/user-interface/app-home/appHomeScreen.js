const Envoy = require('../../../../Envoy');
const { redisClient } = require('../../util/RedisClient');
require('dotenv').config();

/**  
 * Builds JSON block UI for home tab.
 */
const appHomeScreen = async function (locations, slackEmail) {
  let today = new Date();
  let todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const homeView = {
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
            "url": `${process.env.NGROK_URL}/oauthstart/${slackEmail}`
          }
        ]
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Envoy Slack Integration"
        }
      },
      {
        type: "section",
        block_id: "welcome_section",
        text: {
          type: "plain_text",
          text: "Welcome to the Envoy App!"
        },
        accessory: {
          type: "image",
          image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Red_square.svg/640px-Red_square.svg.png",
          alt_text: "Envoy Logo"
        },
      },
      {
        type: "divider"
      },
      {
        type: 'section',
        block_id: "open_message",
        text: {
          type: 'plain_text',
          text: "Hello! I'm the Envoy Bot. I'm here to notify you of relevant events in Envoy.",
          emoji: true,
        },
      },
      {
        type: "divider"
      },
      {
        type: 'section',
        block_id: "slash_commands",
        text: {
          type: 'mrkdwn',
          text: "One way you can interact with me is by sending slash commands such as */envoy-invite*.",
        },
      },
      {
        type: "divider"
      },
      {
        type: 'section',
        block_id: "shortcuts",
        text: {
          type: 'mrkdwn',
          text: "You can also choose shortcuts from the *+* menu on the left of message input.",
        },
      },
      {
        type: "image",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Red_square.svg/640px-Red_square.svg.png",
        alt_text: "inspiration"
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Make Invite",
              emoji: true
            },
            value: "button_invite",
            action_id: "button_invite"
          }
        ]
      }
    ]
  };
  let locationNames = '';
  locations.forEach((locationObject) => {
    locationNames = locationNames + locationObject.attributes.name + ', ';
  });
  locationNames = locationNames.slice(0, -2);
  homeView.blocks.push(
    {
      type: 'section',
      block_id: `location_names`,
      text: {
        type: 'mrkdwn',
        text: `Your company has the following ${locations.length === 1 ? 'location:' : 'locations:'} *${locationNames}*`,
      },
    }
  )
  
  // Note hexists returns 1 for field found, and 0 otherwise. 
  function hExistsPromise() {
    return new Promise((resolve, reject) => {
      redisClient.HEXISTS(slackEmail, 'refreshToken', (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  
  let sessionExists = await hExistsPromise(); 
  if (sessionExists) console.log("AUTH FOUND | HIDE BUTTON") // homeView.blocks = homeView.blocks.slice(2);

  return homeView;
};

module.exports = { appHomeScreen };