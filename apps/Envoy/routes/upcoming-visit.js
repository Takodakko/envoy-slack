const upcomingVisitHandler = async (req, res) => {
    try {
        console.log(req.body, 'req.body in upcoming-visit')
        // const webClient = req.webClientUser;
        // let userEmail = req.body.payload.attributes.email;
        // const location = req.envoy.body.meta.location.attributes.name;
        
        // const statusUpdateExpirationInHours = 8;
        // const expiration = statusUpdateExpirationInHours ? moment().add(statusUpdateExpirationInHours, 'hours').unix() : 0;
        // const userObject = await webClient.users.lookupByEmail({
        //     token: webClient.token,
        //     email: userEmail
        // });
        // const userId = userObject.user.id;
        // webClient.users.profile.set({
        //     user: userId,
        //     profile: {
        //         status_text: `@ ${location} (via Envoy)`,
        //         status_emoji: ':office:',
        //         status_expiration: expiration
        //     }
        // })
        res.status(200).send('upcoming visit');
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Failed to update status', 'utf-8');
    }
};
/** Message employee about upcoming sign in */
const upcomingVisit = {
    path: `/upcoming-visit`,
    method: ['POST'],
    handler: upcomingVisitHandler
};

module.exports = { upcomingVisit };
