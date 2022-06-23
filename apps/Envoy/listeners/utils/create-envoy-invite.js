'use strict';

const {
    authorizeEnvoyPrompt,
    createEnvoyInviteForm
} = require('../../user-interface/modals');

// const {
//     fetchLoggedInUserManagerHirerachy
// } = require('../../salesforce/query/user');

const openCreateEnvoyInviteModal = async (triggerId, client, context) => {
    if (context.hasAuthorized) {
        await client.views.open({
            trigger_id: triggerId,
            view: createEnvoyInviteForm()
        });
    } else {
        // Get BotInfo
        const botInfo = await client.bots.info({ bot: context.botId });
        // Open a Modal with message to navigate to App Home for authorization
        await client.views.open({
            trigger_id: triggerId,
            view: authorizeEnvoyPrompt(context.teamId, botInfo.bot.app_id)
        });
    }
};

module.exports = { openCreateEnvoyInviteModal };
