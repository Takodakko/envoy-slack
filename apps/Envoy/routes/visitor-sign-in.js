const { visitorEntryBuilder } = require('../user-interface/block-messages/visitorEntryBuilder');
/** Notify user on Slack of visitor arrival via Envoy check in */
const visitorSignInHandler = async (req, res) => {
    try {
        // console.log(req.webClient, 'req.webClient');
        const webClientBot = req.webClientBot;
        const webClientUser = req.webClientUser;
        // console.log(webClientBot, 'bot client');
        // console.log(webClientUser, 'user client');
        // console.log(req.body.payload, 'payload');
        // console.log(req.body.meta, 'meta');
        const payload = req.body.payload;
        const visitorName = payload.attributes['full-name'];
        // console.log(visitorName, 'visitor name in listener');
        const userData = payload.attributes['user-data'];
        // console.log(userData, 'userData in listener');
        const visitorEntryBlocks = visitorEntryBuilder(visitorName, userData);
        webClientBot.chat.postMessage({
            channel: 'D03EFA58J9M',
          text: `${visitorName} has arrived.`,
          blocks: visitorEntryBlocks
        })
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
