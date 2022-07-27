
const Envoy = require('../../../../Envoy');
const { redisClient } = require('../../util/RedisClient');
const { encrypt } = require('../../util/crypto')

require('dotenv').config();


/**  
 * Builds JSON block UI for home tab.
 */
const appHomeScreen = function (locations, slackEmail, isAuthed) {
  // let today = new Date();
  // let todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  if (!isAuthed) {
    const homeView = {
      type: "home",
      callback_id: 'home_view',
      blocks: [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Please log in with Envoy to use this app",
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
              "url": `${process.env.NGROK_URL}/oauthstart/${encrypt(slackEmail)}`
            }
          ]
        }
      ]
    };
    return homeView;
  } 
  const homeView = {
    type: "home",
    callback_id: 'home_view',
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Envoy Slack Integration"
        },
      },
      // {
      //   type: "image",
      //     image_url: 'https://avatars.slack-edge.com/2022-07-15/3806730494979_9b81e3c92d914952757d_96.png',
      //     image_url: `${process.env.NGROK_URL}/static/EnvoyBig.png`,
      //   alt_text: "Envoy logo"
      // },
      {
        type: "section",
        block_id: "welcome_section",
        text: {
          type: "plain_text",
          text: "Welcome to the Envoy Slack App!"
        },
        accessory: {
          type: "image",
          image_url: `${process.env.NGROK_URL}/static/EnvoyBig.png`,
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
          text: "I'm here to notify you of relevant events in Envoy, such as when a visitor checks in!",
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
          text: "One way you can interact with me is by typing slash commands such as */envoy-invite*.",
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
        type: "divider"
      },
      {
        type: 'section',
        block_id: "button_explanation",
        text: {
          type: 'mrkdwn',
          text: "Click the 'Make Invite' button below to create an Envoy workplace invitation for a visitor.",
        },
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
  return homeView;
};

module.exports = { appHomeScreen };