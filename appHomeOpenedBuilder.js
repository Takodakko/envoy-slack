

const appHomeOpenedBuilder = function() {


  const homeView = {
    type: "home",
    callback_id: 'home_view',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: "Yo! I'm the Envoy Bot. I'm here to notify you of relevant events in Envoy. Please note that this bot is only for notifications and you cannot interact with me.",
          emoji: true,
        },
      },
    ],
  };
  return homeView;
  
};

module.exports = appHomeOpenedBuilder;