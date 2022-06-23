'use strict';
const { Modal, Blocks } = require('slack-block-builder');

const authorizeEnvoyPrompt = (teamId, appId) => {
    return Modal({ title: 'Ready to Fly', close: 'Close' })
        .blocks(
            Blocks.Section({
                text: `*This shortcut requires to link Slack to your Envoy account.*\n\n Navigate to <slack://app?team=${teamId}&id=${appId}&tab=home|App Home> and click *Authorize with Envoy* to connect your Envoy account`
            })
        )
        .buildToJSON();
};

module.exports = { authorizeEnvoyPrompt };
