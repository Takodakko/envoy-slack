const { visitorEntryBuilder } = require('../user-interface/block-messages/visitorEntryBuilder');

const visitorSignInHandler = async (req, res) => {
    try {
        // console.log(req.body, 'req.body');
        // console.log(req.envoy, 'req.envoy');
        // console.log(req.body.payload.attributes['user-data'], 'user-data');
        // console.log(req.body.payload.attributes['approval-status'], 'approval-status');
        const webClientBot = req.webClientBot;
        const webClientUser = req.webClientUser;
        let userEmail = req.body.payload.attributes['host-email'];
        const locationName = req.body.meta.location.attributes.name;
        const largePhoto = req.body.payload.attributes.thumbnails.large;
        const originalPhoto = req.body.payload.attributes.thumbnails.original;
        const smallPhoto = req.body.payload.attributes.thumbnails.small;
        let photoToUse = null;
        if (largePhoto !== null) {
            photoToUse = largePhoto;
        } else if(originalPhoto !== null) {
            photoToUse = originalPhoto;
        } else {
            photoToUse = smallPhoto;
        }
        
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
        // console.log(payload, 'payload for visitor sign in');
        const isDelivery = payload.attributes['is-delivery'];
        // console.log(payload.relationships['platform-jobs'], 'payload.relationships.platform-jobs for visitor sign in');
        const visitorName = payload.attributes['full-name'];
        const userData = payload.attributes['user-data'];
        const visitorEntryBlocks = visitorEntryBuilder(visitorName, userData, photoToUse, locationName, isDelivery);
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
/** Notify user on Slack of visitor arrival via Envoy check in */
const visitorSignIn = {
    path: `/visitor-sign-in`,
    method: ['POST'],
    handler: visitorSignInHandler
};

module.exports = { visitorSignIn };
