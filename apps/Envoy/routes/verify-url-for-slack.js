
const verifyUrlForSlackHandler = function(req, res) {
//   console.log(req.body, 'req.body');
  if (req.body.token === process.env.SLACK_VERIFICATION_TOKEN && req.body.type === 'url_verification') {
    const challenge = req.body.challenge;
    res.status(200).send(challenge);
  } else {
    res.status(404).send('not found');
  }
  
};
/**Respond to Slack's request to verfiy URL with challenge */
const verifyUrlForSlack = {
    path: '/slack/events',
    method: ['POST'],
    handler: verifyUrlForSlackHandler
};

module.exports = { verifyUrlForSlack };