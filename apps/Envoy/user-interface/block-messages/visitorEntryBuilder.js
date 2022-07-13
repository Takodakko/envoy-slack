/**Build json blocks for visitor entry message */

const visitorEntryBuilder = function(visitorName = '', visitorEmail = '', hostName = '', purpose = '', userData = []) {
  const entryBlocks = [
    {
        type: 'section',
        text: {
            type: 'plain_text',
            text: `${visitorName} is here to see you! Come say Hi! :wave:`,
            emoji: true
        }
    }
  ];
  const fieldsBlock = {
    type: 'section',
    fields: []
  }
    if (hostName.length !== 0) {
        const hostBlock = {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*Host:* ${hostName}`
            }
        };
        fieldsBlock.fields.push(hostBlock);
    }
    
    if (visitorName.length !== 0) {
        const visitorNameBlock = {
                type: 'mrkdwn',
                text: `*Guest's full name:* ${visitorName}`
        };
        fieldsBlock.fields.push(visitorNameBlock);
    }

    if (visitorEmail.length !== 0) {
      const visitorEmailBlock = {
        type: 'mrkdwn',
        text: `*Guest's email:* ${visitorEmail}`
      };
      fieldsBlock.fields.push(visitorEmailBlock);
    }
    if (purpose.length !== 0) {
        const purposeBlock = {
            type: 'mrkdwn',
            text: `*Purpose of visit:* ${purpose}`
        };
        fieldsBlock.fields.push(purposeBlock);
    }
    
  entryBlocks.push(fieldsBlock);
  return entryBlocks;
};

module.exports = { visitorEntryBuilder };