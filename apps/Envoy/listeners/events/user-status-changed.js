const userStatusChanged = async function({context, payload, client}) {
    console.log('userStatusChanged running');
    const userId = payload.user_id;
    
      
      try {
        
        const currentStatus = await client.users.profile.get({
            user: userId
        });
        if (currentStatus.profile.status_text === "I'm working!") {
            await client.users.profile.set({
                // token: token,
                profile: {
                    status_emoji: '',
                    status_text: '',
                    status_expiration: 0
                }
            })
        } else {
            await client.users.profile.set({
                // token: token,
                profile: {
                    status_emoji: ':office:',
                    status_text: "I'm working!",
                    status_expiration: 1000 * 60 * 60 * 8  // 8 hours
                }
            });
        }
        
      }
      catch(error) {
        console.log(error);
      }
};

module.exports = { userStatusChanged };