// const moment = require('moment');
/** Change user status on Slack to in-office when they sign in on Envoy */
const installOnWorkspaceHandler = async (req, res) => {
    try {
        // console.log(req.webClient, 'req.webClient');
        // console.log(req.envoy, 'req.envoy');
        // console.log(req.envoy.body.meta.location, 'req.envoy.body.meta.location');
        // console.log(webClient, 'the web client');
        // console.log(req.envoy.installStorage, 'install storage');
        // console.log(req.query, 'req.query');
        console.log(req.query.code, 'req.query.code');
        const code = req.query.code;
        const info = {
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
            code: code
        };
        
        res.status(200).send('installed');
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Failed to update status', 'utf-8');
    }
};

const installOnWorkspace = {
    path: `/`,
    method: ['GET'],
    handler: installOnWorkspaceHandler
};

module.exports = { installOnWorkspace };
