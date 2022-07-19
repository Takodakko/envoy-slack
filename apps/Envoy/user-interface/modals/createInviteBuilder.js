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
const createInviteBuilder = function(locations, flows = [], fields = []) {
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
  // Below flowsSelection is for displaying visitor type options once user has chosen a location.
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
  // Below fieldsSelection is for creating custom inputs based on the flow for that type once the user has chosen a visitor type.
  let fieldsSelection = [];
  if (fields.length === 0) {
    fieldsSelection = null;
  } else {
    fields.sort((a, b) => (a.position < b.position) ? -1 : 1);
    fields.forEach((fieldsObject) => {
      console.log(fieldsObject, 'fieldsObject');
      if (fieldsObject.kind === 'text') {
        const textField = {
          type: 'input',
          block_id: fieldsObject.name,
          optional: !fieldsObject.required,
          label: {
            type: 'plain_text',
            text: fieldsObject.name,
          },
          element: {
            type: 'plain_text_input',
            action_id: fieldsObject.id,
            multiline: false,
            placeholder: {
              type: "plain_text",
              text: fieldsObject.name,
            },
          }
        };
        fieldsSelection.push(textField);
      }
      if (fieldsObject.kind === 'single-selection' && fieldsObject.options.length > 0) {
        // if (fieldsObject.kind === 'single-selection') {
        const selectableOptions = fieldsObject.options.map((option) => {
          optionObject = {
            text: {
            type: "plain_text",
            text: option.value,
            emoji: true
        },
          value: option.id.toString()
      }
          return optionObject;;
        })
        const singleSelectField = {
          type: 'input',
          block_id: fieldsObject.name,
          label: {
            text: fieldsObject.name,
            type: 'plain_text'
          },
          optional: !fieldsObject.required,
          element: {
              action_id: fieldsObject.id,
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: fieldsObject.name,
                emoji: true,
              },
              options: selectableOptions, 
          }
        }
        fieldsSelection.push(singleSelectField);
      }
      // Discovered that host options are not being sent.  Look into later.  Temporary fix(?) below.
      if (fieldsObject.kind === 'single-selection' && fieldsObject.options.length === 0 && fieldsObject.identifier === 'host') {
        const hostField = {
          type: 'input',
          block_id: fieldsObject.name,
          optional: !fieldsObject.required,
          label: {
            type: 'plain_text',
            text: fieldsObject.name,
          },
          element: {
            type: 'plain_text_input',
            action_id: fieldsObject.id,
            multiline: false,
            placeholder: {
              type: "plain_text",
              text: fieldsObject.name,
            },
          }
        };
        fieldsSelection.push(hostField);
      }
      if (fieldsObject.kind === 'phone') {
        const phoneField = {
          type: 'input',
          block_id: fieldsObject.name,
          optional: !fieldsObject.required,
          label: {
            type: 'plain_text',
            text: fieldsObject.name,
          },
          element: {
            type: 'plain_text_input',
            action_id: fieldsObject.id,
            multiline: false,
            placeholder: {
              type: "plain_text",
              text: fieldsObject.name,
            },
          }
        };
        fieldsSelection.push(phoneField);
      }
      if (fieldsObject.kind === 'email') {
        const emailField = {
          type: 'input',
          block_id: fieldsObject.name,
          optional: !fieldsObject.required,
          label: {
            type: 'plain_text',
            text: fieldsObject.name,
          },
          element: {
            type: 'plain_text_input',
            action_id: fieldsObject.id,
            multiline: false,
            placeholder: {
              type: "plain_text",
              text: fieldsObject.name,
            },
          }
        };
        fieldsSelection.push(emailField);
      }
    
  });
  
  }
  console.log(fieldsSelection, 'fieldsSelection');
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
        block_id: 'location',
        elements: [
          {
            action_id: 'location_selected',
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Location',
              emoji: true,
            },
            options: locationSelections, 
         },
        ]
      },
      {
        type: 'actions',
        block_id: 'visitor_type',
        elements: [
          {
            action_id: 'visitor_type_selected',
            type: 'static_select',
            placeholder: {
            type: 'plain_text',
            text: 'Visitor Type',
            emoji: true
            },
          options: flowsSelection,
          }
        ]
      },
      // {
      //   type: 'input',
      //   block_id: 'guest_full_name',
      //   label: {
      //     type: 'plain_text',
      //     text: 'Full name of guest'
      //   },
      //   element: {
      //     type: 'plain_text_input',
      //     action_id: 'guest_full_name',
      //     multiline: false,
      //     placeholder: {
      //       type: 'plain_text',
      //       text: "Enter your guest's name"
      //   },
      //   }
      // },
    //   {
    //     type: 'input',
    //     optional: true,
    //     block_id: 'guest_email',
    //     label: {
    //       type: 'plain_text',
    //       text: 'Email of guest'
    //     },
    //     element: {
    //       type: 'plain_text_input',
    //       action_id: 'guest_email',
    //       multiline: false,
    //       placeholder: {
    //         type: 'plain_text',
    //         text: "Enter your guest's email"
    //     },
    //     }
    //   },
    //   {
    //     type: "input",
    //     optional: true,
    //     block_id: 'send_email',
    //     label: {
    //         type: "plain_text",
    //         text: "Send guest an email?",
    //         emoji: true
    //     },
    //     element: {
    //      type: 'static_select',
    //      action_id: 'send_email',
    //      placeholder: {
    //        type: 'plain_text',
    //        text: 'Email guest?',
    //        emoji: true,
    //      },
    //      options: [
    //       {
		// 				text: {
		// 					type: "plain_text",
		// 					text: "yes",
		// 					emoji: true
		// 				},
		// 				value: "0"
		// 			},
		// 			{
		// 				text: {
		// 					type: "plain_text",
		// 					text: "no",
		// 					emoji: true
		// 				},
		// 				value: "1"
		// 			}
    //      ],
    //     },   
    //  },
      // {
      //       type: 'input',
      //       block_id: 'host_name',
      //       optional: true,
      //       label: {
      //           type: 'plain_text',
      //           text: `Host Name`
      //       },
      //       element: {
      //           type: 'plain_text_input',
      //           action_id: 'host_name',
      //       placeholder: {
      //           type: 'plain_text',
      //           text: "Enter the host's name"
      //       }
      //   }
      // },
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
        // {
        //   type: 'input',
        //   optional: true,
        //   block_id: 'notes',
        //   label: {
        //     type: 'plain_text',
        //     text: 'Other notes'
        //   },
        //   element: {
        //     type: 'plain_text_input',
        //     action_id: 'notes',
        //     multiline: true,
        //     placeholder: {
        //       type: 'plain_text',
        //       text: "Enter other notes here"
        //   },
        //   }
        // },
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
  if (fieldsSelection) {
    modal.blocks.push(...fieldsSelection);
  }
  const notesSection = {
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
  };
  modal.blocks.push(notesSection);
  
  return modal;
};


module.exports = { createInviteBuilder };
