/**Build json blocks for visitor entry message */

const visitorEntryBuilder = function(visitorName, userData, photoToUse, locationName, isDelivery) {
  console.log(isDelivery, 'isDelivery in JSON');
  const entryBlocks = [
    {
        type: 'section',
        text: {
            type: 'plain_text',
            text: !isDelivery ? `${visitorName} is here to see you at ${locationName}! Come say Hi! :wave:` : `You have a delivery at ${locationName}!`,
            emoji: true
        }
    }
  ];
  if (photoToUse !== null) {
    const photoBlock = {
      type: "image",
      image_url: photoToUse,
      alt_text: "visitor"
    };
    entryBlocks[0].accessory = photoBlock;
  };
  const fieldsBlock = {
    type: 'section',
    fields: []
  }
  userData.forEach((field) => {
    const aField = {
      type: 'mrkdwn',
      text: `*${field.field}* \n ${field.value}`
    };
    fieldsBlock.fields.push(aField);
  })
  entryBlocks.push(fieldsBlock);
  return entryBlocks;
};

module.exports = { visitorEntryBuilder };