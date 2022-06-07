const axios = require("axios");

const slackResponder = async function(req, res, next) {
    // console.log(data, 'data');
    console.log(req.event, 'req.event');
    console.log(req.payload, 'req.payload');
  const trigger_id = req.event.trigger_id;
  const responseUrl = req.response_url;
  const response = {
    'Content-type': 'application/json',
    trigger_id: trigger_id,
    body: {
        "text": "Thanks for your request, we'll process it and get back to you."
    },
  };
  if (responseUrl === undefined) {
      next()
  }
  axios
  .post(responseUrl, response)
  .then(function(resp) {
      console.log(resp)
  })
  .catch(function(err) {
      console.log(err)
  })
  next()
};

module.exports = slackResponder;