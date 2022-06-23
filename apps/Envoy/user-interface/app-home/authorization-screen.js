'use strict';
const { HomeTab, Actions, Elements, Blocks } = require('slack-block-builder');

/**
 * @TODO
 * insert authUrl
 * @param {*} authUrl 
 * @returns 
 */
const authorizationScreen = (authUrl) => {
    const homeTab = {
        "type": "home",
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Connect to Envoy",
                    "emoji": true
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": "To get started with the Envoy app, authorize with Envoy.",
                    "emoji": true
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Authorize with Envoy",
                            "emoji": true
                        },
                        "value": "authorize-with-envoy",
                        "action_id": "authorize-with-envoy",
                        "url": "www.envoy.com"
                    }
                ]
            }
        ]
    }
    return homeTab;
};

module.exports = { authorizationScreen };

 // const homeTab = HomeTab({
    //     callbackId: 'authorize-salesforce',
    //     privateMetaData: 'authorization-screen'
    // }).blocks(
    //     Blocks.Header({ text: 'Connect to Salesforce' }),
    //     Blocks.Divider(),
    //     Blocks.Section({
    //         text: 'To get started with Ready to Fly, authorize with Salesforce'
    //     }),
    //     Actions({ blockId: 'sf-login' }).elements(
    //         Elements.Button({ text: 'Authorize with Salesforce' })
    //             .value('authorize-with-salesforce')
    //             .actionId('authorize-with-salesforce')
    //             .url(authUrl)
    //             .primary(true)
    //     )
    // );
    // return homeTab.buildToJSON();
