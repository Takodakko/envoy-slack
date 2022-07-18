require('dotenv').config();

const saveCredentials = async (req, res) => {
     console.log(req.envoy.body)
     console.log(req.envoy.body.meta)

    const {
        installStorage
    } = req.envoy
    
    const {
        bot_user_id: slackUserId,
        scope: botScopes,
        access_token:slackAdminAccessToken,
        enterprise: enterprise,
        is_enterprise_install: is_enterprise_install,
        team: team
    } = req.envoy.body.payload;

    console.log(slackAdminAccessToken)
    let teamIdsToAdminTokens = await installStorage.get('teamIdsToBotTokens')
    if(!teamIdsToAdminTokens){
        teamIdsToAdminTokens = {}
    }
    
    if (!is_enterprise_install && team) {
        teamIdsToAdminTokens[team.id] = slackAdminAccessToken;
    }
    await installStorage.set('teamIdstoBotTokens', teamIdsToAdminTokens)

    console.log(teamIdsToAdminTokens)
    console.log(await installStorage.get(teamIdsToAdminTokens))

    res.status(200).send({});
}

const slackCredentials = {
    path: '/slack-credentials',
    method: ['POST'],
    handler: saveCredentials
};

module.exports = { slackCredentials };