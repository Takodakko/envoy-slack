// const moment = require('moment');
/** Notify user on Slack of visitor arrival via Envoy check in */
const visitorSignInHandler = async (req, res) => {
    try {
        // console.log(req.webClient, 'req.webClient');
        const webClient = req.webClientBot;
        console.log(req.body, 'req.body');
        console.log(req.envoy, 'req.envoy');
        // console.log(req.envoy.body.meta.location, 'req.envoy.body.meta.location');
        // webClient.chat.postMessage({

        // })
        res.status(200).send('visitor arrival notification made');
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Visitor arrival notification failed', 'utf-8');
    }
};

const visitorSignIn = {
    path: `/visitor-sign-in`,
    method: ['POST'],
    handler: visitorSignInHandler
};

module.exports = { visitorSignIn };
