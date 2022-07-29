// const Envoy = require('./Envoy');
const { EnvoyAPI } = require('@envoy/envoy-integrations-sdk');

/** Creates middleware that gets location and flow data from Envoy and attaches it to context object. */
const attachEnvoyInfoOuter = function() {
    const locations = [];
    const flowsAndLocations = [];
    const attachEnvoyInfoInner = async function({context, next}) {
        if (context.hasAuthorized === false) {
            next();
            return;
        }
        // const envoy = Envoy.getInstance().API;
        const envoy = new EnvoyAPI(context.authInfo.accessToken);
        // console.log(context.authInfo.accessToken, 'accessToken');
        if (locations.length === 0) {
            console.log('inner! if');
            const locationsInner = await envoy.locations();
            // console.log(locationsInner, 'locationsInner');
            locations.push(...locationsInner);
        
        const flowsAndLocationsInner = [];
        for (let i = 0; i < locationsInner.length; i++) {
            // console.log(locationsInner[i].id, 'locationsInner[i].id');
            const flowsAtPlace = {locationId: locationsInner[i].id, locationName: locationsInner[i].attributes.name};
            const flows = await envoy.flows(locationsInner[i].id);
            flowsAtPlace.flows = flows;
            flowsAndLocationsInner.push(flowsAtPlace);
        }
        flowsAndLocations.push(...flowsAndLocationsInner);
        }
        // console.log(flowsAndLocations[0].flows, 'flows and locations in Slack Middleware');
        console.log('inner! after if');
        context.locations = locations;  // array of objects -> { id: **id for location**, attributes: {name: **name of location**} }
        context.flows = flowsAndLocations; // array of objects -> { locationId: **id of location**, locationName: **name of location**, flows: [{id: **id of flow**, attributes: {name: **name of flow**}}]}
        next();
    };
    return attachEnvoyInfoInner;
};


module.exports = attachEnvoyInfoOuter;