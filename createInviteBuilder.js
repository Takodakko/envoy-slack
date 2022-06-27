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
 * Creates the JSON blocks for the invitation modal.
 */
const createInviteBuilder = function(locations, flows = []) {
  // console.log(locations, 'locations in Invite builder');
  let locationSelections;
  if (Array.isArray(locations)) {
    locationSelections = locations.map((locationObject) => {
      return ({
        text: {
          type: "plain_text",
          text: locationObject.locationName,
          emoji: true
      },
      value: locationObject.locationId
      })
    });
    // console.log(locationSelections, 'locationSelections');
  } else {
    locationSelections = [{
      text: {
        type: "plain_text",
        text: locations.attributes.name,
        emoji: true
    },
    value: locations.id
    }]
  }
  
  // let flowsSelection = locationsAndFlows.map((locationObject) => {
  //   return (locationObject.flows.map((flow) => {
  //     return ({
  //       text: {
  //         type: "plain_text",
  //         text: `${flow.attributes.name}`,
  //         emoji: true
  //     },
  //     value: `${locationObject.locationId}-${flow.id}`
  //     })
  //   }))
  // });
  // flowsSelection = flowsSelection.flat();
  let flowsSelection = [];
  if (flows.length === 0) {
    flowsSelection = [{
      text: {
        type: 'plain_text',
        text: 'choose a location first',
        emoji: true,
      },
      value: 'unchosen'
    }]
  } else {
    // console.log(flows, 'flows in invite builder');
    flowsSelection = flows.map((flowsObject) => {
          return ({
            text: {
              type: "plain_text",
              text: `${flowsObject.text.text}`,
              emoji: true
          },
          value: `${flowsObject.value}`
          })
        
      });
      flowsSelection = flowsSelection.flat();
  }
  
  // console.log(flowsSelection, 'flowsSelection');
  const modal = {
    type: 'modal',
    callback_id: 'invite_modal',
    title: {
      type: 'plain_text',
      text: 'New Invite'
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
        type: 'actions',
        block_id: 'location_guest_type',
        elements: [
          {
            action_id: 'location',
            type: 'static_select',
            // action_id: 'location',
            placeholder: {
              type: 'plain_text',
              text: 'Location',
              emoji: true,
            },
            options: locationSelections, 
         },
         {
          action_id: 'visitor_type',
          type: 'static_select',
          // action_id: 'visitor_type',
          placeholder: {
            type: 'plain_text',
            text: 'Visitor Type',
            emoji: true,
          },
          options: flowsSelection, 
       },
        ]
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
        optional: true,
        block_id: 'guest_email',
        label: {
          type: 'plain_text',
          text: 'Email of guest'
        },
        element: {
          type: 'plain_text_input',
          action_id: 'guest_email',
          multiline: false,
          placeholder: {
            type: 'plain_text',
            text: "Enter your guest's email"
        },
        }
      },
      {
        type: "input",
        optional: true,
        block_id: 'send_email',
        label: {
            type: "plain_text",
            text: "Email guest?",
            emoji: true
        },
        element: {
         type: 'static_select',
         action_id: 'send_email',
         placeholder: {
           type: 'plain_text',
           text: 'Email guest?',
           emoji: true,
         },
         options: [
          {
						text: {
							type: "plain_text",
							text: "yes",
							emoji: true
						},
						value: "0"
					},
					{
						text: {
							type: "plain_text",
							text: "no",
							emoji: true
						},
						value: "1"
					}
         ],
        },   
     },
      {
            type: 'input',
            block_id: 'host_name',
            optional: true,
            label: {
                type: 'plain_text',
                text: `Host Name`
            },
            element: {
                type: 'plain_text_input',
                action_id: 'host_name',
            placeholder: {
                type: 'plain_text',
                text: "Enter the host's name"
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
        {
          type: 'input',
          optional: true,
          block_id: 'notes',
          label: {
            type: 'plain_text',
            text: 'Other notes'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'notes',
            multiline: true,
            placeholder: {
              type: 'plain_text',
              text: "Enter other notes here"
          },
          }
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
