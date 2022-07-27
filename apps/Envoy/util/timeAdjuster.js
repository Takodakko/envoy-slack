const moment = require('moment-timezone');

/**
 * 
 Adjusts time entered by user to Universal time for consumption by Envoy API.
 */
const timeAdjuster = function(rawDate, rawTime, timeZone) {
    const adjustedTime = moment.tz(`${rawDate} ${rawTime}`, 'YYYY-MM-DD h:mm a', timeZone).format();
    return adjustedTime;
};

module.exports = timeAdjuster;