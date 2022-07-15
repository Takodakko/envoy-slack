const { visitorEntryBuilder } = require('../user-interface/block-messages/visitorEntryBuilder');
/** Notify user on Slack of visitor arrival via Envoy check in */
const visitorSignInHandler = async (req, res) => {
    try {
        const webClientBot = req.webClientBot;
        const webClientUser = req.webClientUser;
        let userEmail = req.body.payload.attributes['host-email'];
        console.log(req.body, 'req.body');
        // userChannel is the id of the host, based on the email address in the data from Envoy. This will post in the Envoy app channel for this particular user. 
        // If there is no email in the data from Envoy, then this step will be skipped and notifications will only appear in channels the bot has been invited to.
        let userChannel = null;
        if (userEmail) {
            const userObject = await webClientUser.users.lookupByEmail({
                token: webClientUser.token,
                email: userEmail
            });
            userChannel = userObject.user.id;
        } 
        // channels is a list of channels the bot is invited to, which it can post in.
        const channels = await webClientBot.users.conversations();
        
        const payload = req.body.payload;
        const visitorName = payload.attributes['full-name'];
        const userData = payload.attributes['user-data'];
        const visitorEntryBlocks = visitorEntryBuilder(visitorName, userData);
        if (userChannel !== null) {
            webClientBot.chat.postMessage({
            channel: userChannel,
              text: `${visitorName} has arrived.`,
              blocks: visitorEntryBlocks
            })
        }
        channels.channels.forEach((channel) => {
            webClientBot.chat.postMessage({
                channel: channel.id,
                  text: `${visitorName} has arrived.`,
                  blocks: visitorEntryBlocks
                })
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
