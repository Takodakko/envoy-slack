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

const createInviteBuilder = function() {
  const modal = {
    type: 'modal',
    callback_id: 'invite_modal',
    title: {
      type: 'plain_text',
      text: 'Make an Invitation'
    },
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Fill in the invite details below:',
              },
      },
      {
        type: 'input',
        block_id: 'guest_full_name',
        label: {
          type: 'plain_text',
          text: 'Full name of guest'
        },
        element: {
          type: 'plain_text_input',
          action_id: 'guest_full_name',
          multiline: false,
          placeholder: {
            type: 'plain_text',
            text: "Enter your guest's name"
        },
        }
      },
      {
            type: 'input',
            block_id: 'host_name',
            optional: false,
            label: {
                type: 'plain_text',
                text: 'Host Name'
            },
            element: {
                type: 'plain_text_input',
                action_id: 'host_name',
            placeholder: {
                type: 'plain_text',
                text: 'Enter your name'
            }
        }
      },
      {
        type: 'input',
        block_id: 'arrival_date',
        optional: false,
        element: {
          type: 'datepicker',
          action_id: 'date',
                 },
        label: {
          type: 'plain_text',
          text: 'Arrival Date',
             },
       },
       {
           type: "input",
           block_id: 'location',
           label: {
               type: "plain_text",
               text: "Location",
               emoji: true
           },
           element: {
            type: 'static_select',
            action_id: 'location',
            placeholder: {
              type: 'plain_text',
              text: 'Location',
              emoji: true,
            },
        
            options: [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "HQ",
                        "emoji": true
                    },
                    "value": "value-0"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Home",
                        "emoji": true
                    },
                    "value": "value-1"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Coffee Shop",
                        "emoji": true
                    },
                    "value": "value-2"
                }
            ],
           },   
        },
        {
            type: 'input',
            block_id: 'arrival_time',
            optional: false,
            element: {
              type: 'static_select',
              action_id: 'time',
              options: times,
              },
            label: {
              type: 'plain_text',
              text: 'Arrival Time',
            },
        },
    ],
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
  }
  return modal;
};


module.exports = createInviteBuilder;