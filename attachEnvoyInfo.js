const Envoy = require('./Envoy');

/** Creates middleware that gets location and flow data from Envoy and attaches it to context object. */
const attachEnvoyInfoOuter = function() {
    const locations = [];
    const flowsAndLocations = [];
    const attachEnvoyInfoInner = async function({context, next}) {
        
        const envoy = Envoy.getInstance();
        if (locations.length === 0) {
            console.log('inner! if');
            const locationsInner = await envoy.API.locations();
            locations.push(...locationsInner);
        
        const flowsAndLocationsInner = [];
        for (let i = 0; i < locationsInner.length; i++) {
            const flowsAtPlace = {locationId: locationsInner[i].id, locationName: locationsInner[i].attributes.name};
            const flows = await envoy.API.flows(locationsInner[i].id);
            flowsAtPlace.flows = flows;
            flowsAndLocationsInner.push(flowsAtPlace);
        }
        flowsAndLocations.push(...flowsAndLocationsInner);
        }
        // console.log(flowsAndLocations[0].flows, 'flows and locations in Slack Middleware');
        console.log('inner! after if');
        context.locations = locations;  // array of object -> { id: **id for location**, attributes: {name: **name of location**} }
        context.flows = flowsAndLocations; // array of objects -> { locationId: **id of location**, locationName: **name of location**, flows: [{id: **id of flow**, attributes: {name: **name of flow**}}]}
        next();
    };
    return attachEnvoyInfoInner;
};


module.exports = attachEnvoyInfoOuter;