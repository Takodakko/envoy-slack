require('dotenv').config();

const saveCredentials = async (req, res) => {
    const adminToken = req.envoy.body.payload.authed_user ? req.envoy.body.payload.authed_user.access_token : null;
    const botToken = req.envoy.body.payload.access_token;
    const teamId = req.envoy.body.payload.team ? req.envoy.body.payload.team.id : null;
    const enterpriseId = req.envoy.body.payload.enterprise ? req.envoy.body.payload.enterprise.id : null;
     console.log(req.envoy.body.payload.authed_user, 'authed user');
     console.log(adminToken, 'adminToken');
     console.log(botToken, 'bot access token');
     console.log(req.envoy.body.payload.bot_user_id, 'bot user id');
     console.log(teamId, 'team id');
     console.log(enterpriseId, 'enterprise');
    // console.log("\n")
    // console.log(req.envoy.body.meta)
    // console.log("\n")
    
    /**
     * @TODO
     * Fix double POST req from Envoy to make cleaner code here
     */
    //Check for 2nd POST without payload from slack
    if(Object.keys(req.envoy.payload).length !== 0){
        const {
            installStorage
        } = req.envoy;
        
        const {
            authed_user: authed_user,
            scope: scope,
            access_token:access_token,
            enterprise: enterprise,
            is_enterprise_install: is_enterprise_install,
            team: team
        } = req.envoy.body.payload;

        const botCredentials = {
            authed_user: authed_user,
            bot_access_token: access_token,
            bot_scope: scope
        };

        console.log(authed_user, 'authed_user line 43');
        
        let teamIdsToAdminTokens = await installStorage.get('teamIdsToAdminTokens');
        console.log(teamIdsToAdminTokens, 'teamIdsToAdminTokens');
        if(!teamIdsToAdminTokens){
            teamIdsToAdminTokens = {};
        }
        
        if (!is_enterprise_install && team) {
            teamIdsToAdminTokens[team.id] = access_token;
        }
        await installStorage.set('teamIdstoAdminTokens', teamIdsToAdminTokens)
        //console.log(teamIdsToAdminTokens)
        console.log(await installStorage.get('teamIdstoAdminTokens'), 'checking teamIdstoAdminTokens')

        res.status(200).send({
            TEAM_IDS: Object.keys(teamIdsToAdminTokens),
            ENTERPRISE_ID: (is_enterprise_install && enterprise) ? enterprise.id : undefined,
            botCredentials: botCredentials,
            authed_user: authed_user
        });
    } else {
        console.log("round two");
        res.status(200);
    }

    
            // console.log("asd");
            // res.status(200);
        
}

const slackCredentials = {
    path: '/slack-credentials',
    method: ['POST'],
    handler: saveCredentials
};

module.exports = { slackCredentials };
// https://slack.com/oauth/v2/authorize?client_id=979940347345.3632123722103&redirect_uri=https%3A%2F%2Fapp.envoy.com%2Fplatform%2F7b803805-d179-44c9-b0e0-afb757b086c1%2Foauth2%2Fstep-1%2Fcallback&response_type=code&scope=channels%3Aread%2Cchat%3Awrite%2Ccommands%2Cgroups%3Aread%2Cusers%3Aread%2Cusers%3Aread.email&state=45c9509d-b1e2-43fd-a3a9-c041072fcac7&user_scope=users.profile%3Awrite
// https://slack.com/oauth/v2/authorize?client_id=2151990311.2231735577&redirect_uri=https%3A%2F%2Fweb.envoy.com%2Fplatform%2Fslack%2Foauth2%2Fdefault%2Fcallback&response_type=code&scope=channels%3Aread%2Cchat%3Awrite%2Ccommands%2Cgroups%3Aread%2Cusers%3Aread%2Cusers%3Aread.email&state=85e6ff5a-e240-4344-8cb7-122f68f6f0d3&user_scope=users.profile%3Awrite
// https://envoyintegrations.slack.com/oauth?client_id=2151990311.2231735577&scope=channels%3Aread%2Cchat%3Awrite%2Ccommands%2Cgroups%3Aread%2Cusers%3Aread%2Cusers%3Aread.email&user_scope=users.profile%3Awrite&redirect_uri=https%3A%2F%2Fweb.envoy.com%2Fplatform%2Fslack%2Foauth2%2Fdefault%2Fcallback&state=6aee31f4-5670-49c6-b3be-291773dfb380&granular_bot_scope=1&single_channel=0&install_redirect=&tracked=1&response_type=code&team=