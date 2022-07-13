const { visitorEntryBuilder } = require('../user-interface/block-messages/visitorEntryBuilder');
/** Notify user on Slack of visitor arrival via Envoy check in */
const visitorSignInHandler = async (req, res) => {
    try {
        // console.log(req.webClient, 'req.webClient');
        const webClient = req.webClientBot;
        
        console.log(req.body.payload, 'payload');
        console.log(req.body.meta, 'meta');
        const payload = req.body.payload;
        // const team = await webClient.team.info();
        // console.log(team, 'team');
        // const teamId = team.id;
        // const result = await webClient.users.conversations({
        //     team_id: teamId
        // });
        // console.log(result.channels, 'result');
        // const bot = await webClient.bots.info({
        //     team_id: teamId,
        // });
        // console.log(bot, 'bot');
        // console.log(webClient, 'webClient');
        // let userEmail = req.body.payload.attributes['host-email'];
        // console.log(req.body, 'req.body');
        // console.log(req.envoy, 'req.envoy');
        // if (userEmail.includes('+sdk')) {
        //     const start = userEmail.indexOf('+');
        //     userEmail = userEmail.slice(0, start) + userEmail.slice(start + 4);
            
        // }
        // const userObject = await webClient.users.lookupByEmail({
        //     token: webClient.token,
        //     email: userEmail
        // });
        // const userId = webClient.id;
        const visitorName = payload.attributes['full-name'];
        // console.log(visitorName, 'visitor name');
        const visitorEmail = payload.attributes.email ? payload.attributes.email : '';
        const hostName = payload.attributes.host ? payload.attributes.host : '';
        const purpose = payload.attributes['flow-name'];
        const userData = payload.attributes['user-data'];
        const visitorEntryBlocks = visitorEntryBuilder(visitorName, visitorEmail, hostName, purpose, userData);
        // console.log(req.envoy.body.meta.location, 'req.envoy.body.meta.location');
        webClient.chat.postMessage({
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
