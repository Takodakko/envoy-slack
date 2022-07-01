const {
    querySlackAuthentication
} = require('../salesforce/query/slack-authentication');
const NodeCache = require('node-cache');

// Cache to Store access and refresh tokens per user
const tokenCache = new NodeCache({ stdTTL: 600 });
// Cache to Store connection object per user
const connectionCache = new NodeCache({ stdTTL: 600 });

const authWithEnvoy = async ({
    payload,
    context = {},
    next,
    body,
    slackUserId
} = {}) => {
    //SERVER2SERVER AUTH FLOW (CHECKS FOR EXISTING TOKENS)

    //USER2USER AUTH FLOW (REQUESTING FOR ACCESS AND REFRESH TOKS)
}

module.exports = { authWithEnvoy, tokenCache}