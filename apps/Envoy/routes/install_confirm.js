const axios = require('axios');
const FormData = require('form-data');
let { redisClient } = require('../util/redisClient');

const installConfirmHandler = async (req, res) => {
    try {
        console.log('HI I AM INSTALL_CONFIRM');
        let begin = req.url.indexOf("code") + 5;
        let end = req.url.indexOf("&");
        const code = req.url.slice(begin, end);
        const form = new FormData();
        form.append('code', code);
        form.append('client_id', process.env.SLACK_CLIENT_ID);
        form.append('client_secret', process.env.SLACK_CLIENT_SECRET);

        const response = await axios.post(
            'https://slack.com/api/oauth.v2.access',
            form,
            {
                headers: {
                    ...form.getHeaders()
                }
            }
        );

        const install = response.data;
        if (!install.is_enterprise_install) {
            redisClient.hSet(install.team.id,
                'id', install.team.id,
                'name', install.team.name,
                'tokenType', 'bot',
                'authVersion', 'v2',
                'bot_user_id', install.bot_user_id,
                'botToken', install.access_token,
            );
            res.end();
        } else {
            // Handle enterprise install.
        }
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Failed to install', 'utf-8');
    }
}


const installConfirm = {
    path: '/install-confirm',
    method: ['GET'],
    handler: installConfirmHandler
};

module.exports = { installConfirm };
