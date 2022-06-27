const moment = require('moment-timezone');

const timeAdjuster = function(rawDate, rawTime, timeZone) {
    const adjustedTime = moment.tz(`${rawDate} ${rawTime}`, 'YYYY-MM-DD h:mm a', timeZone).format();
    return adjustedTime;
};

module.exports = timeAdjuster;