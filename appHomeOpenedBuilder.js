

const appHomeOpenedBuilder = function() {
  const homeView = {
    type: "home",
    callback_id: 'home_view',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: "Hello! I'm the Envoy Bot. I'm here to notify you of relevant events in Envoy. You can interact with me with slash commands!",
          emoji: true,
        },
      },
    ],
  };
  return homeView;
};

module.exports = appHomeOpenedBuilder;