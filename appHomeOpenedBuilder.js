

const appHomeOpenedBuilder = function() {
  const homeView = {
    type: "home",
    callback_id: 'home_view',
    blocks: [
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
      // {
      //   type: "section",
      //   block_id: "invite_button_section",
      //   text: {
      //     type: "plain_text",
      //     text: "Make an Invitation"
      //   },
      //   accessory: {
      //     type: "button",
      //     text: {
      //       type: "plain_text",
      //       text: "Invite"
      //     },
      //     value: "create_invite",
      //     action_id: "create_invite"
      //   }
      // },
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
    ],
  };
  return homeView;
};

module.exports = appHomeOpenedBuilder;