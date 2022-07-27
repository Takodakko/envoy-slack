const moment = require('moment');

/* Use moment to create array of times for time selection dropdown */
const start = moment().startOf('day');
const end = start.clone().endOf('day');
const times = [];
while (start.isBefore(end)) {
  const formatted = start.format('h:mm a');
  times.push({
    text: {
      type: 'plain_text',
      text: formatted,
      emoji: true,
    },
    value: formatted,
  });
  start.add(15, 'minutes');
}
/**
 * Creates the JSON blocks for the register modal.
 */
const registerBuilder = function(locations, userEmail) {
    const locationSelections = locations.map((locationObject) => {
      return ({
        text: {
          type: "plain_text",
          text: locationObject.locationName,
          emoji: true
      },
      value: locationObject.locationId
      })
    });

  const modal = {
    type: 'modal',
    callback_id: 'register_modal',
    title: {
      type: 'plain_text',
      text: 'Register to come in!'
    },
    submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true,
      },
      private_metadata: userEmail,
    blocks: [
        {
            type: 'input',
            block_id: 'register_location',
            optional: false,
            element: {
                type: 'static_select',
                action_id: 'register_location_selected',
                options: locationSelections,
                },
            label: {
                type: 'plain_text',
                text: 'Location',
            },
          },
        {
            type: 'input',
            block_id: 'register_arrival_date',
            optional: false,
            element: {
              type: 'datepicker',
              action_id: 'register_date',
            },
            label: {
              type: 'plain_text',
              text: 'Arrival Date',
            },
        },
        {
            type: 'input',
            block_id: 'register_arrival_time',
            optional: false,
            element: {
              type: 'static_select',
              action_id: 'register_time',
              options: times,
            },
            label: {
              type: 'plain_text',
              text: 'Arrival Time',
            },
        },
    ]
};
return modal;
};

module.exports = { registerBuilder };