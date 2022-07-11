const userStatusChanged = async function({context, payload, client}) {
    
    // const userId = payload.user_id;
    
      
      try {
        console.log('userStatusChanged running');    
        // const currentStatus = await client.users.profile.get({
        //     user: userId
        // });
        // await client.chat.postMessage({
        //     text: `Your status has been changed.`,
        //     channel: userId
        // });
            
        }
      catch(error) {
        console.log(error);
      }
};

module.exports = { userStatusChanged };