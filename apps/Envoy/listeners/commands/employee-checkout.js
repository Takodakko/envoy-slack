
const { EnvoyAPI } = require('@envoy/envoy-integrations-sdk');

/**  
* Slash command to check out of the office via Envoy.
*/

const employeeCheckout = async function({ack, say, context, payload, client}) {
    try {
        ack();
        const envoy = new EnvoyAPI(context.authInfo.accessToken);
        const userId = payload.user_id;
        const user = await client.users.profile.get({user: userId});
        const userEmail = user.profile.email;
        // const now = Date.now() + (60 * 60 * 1000);
        // const today = new Date(now).toISOString();
        // const yesterdayUnix = now - (24 * 60 * 60 * 1000);
        // const yesterday = new Date(yesterdayUnix).toISOString();
        // Get all workschedules under the assumption that only one should be checked in and not checked out yet. Safe assumption?
        const envoyWorkSchedule = await envoy.workSchedules({userEmails: [userEmail]});
        // const envoyWorkSchedule = await envoy.API.workSchedules({userEmails: [userEmail], expectedArrivalAtBefore: today, expectedArrivalAtAfter: yesterday});
        // console.log(envoyWorkSchedule, 'envoyWorkSchedule');
        const workToday = envoyWorkSchedule.filter((work) => {
            // Check for work schedules where the user already checked in, but hasn't checked out.
            // if (work.status === 'APPROVED' && work.arrivedAt !== null && work.departedAt === null) {    <-- Had this originally, 
            // but found example where I was checked in, but status was still pending.  Status update slow?
                if (work.arrivedAt !== null && work.departedAt === null) {
                return work;
            }
        })
        if (workToday.length > 0) {
            console.log(workToday, 'workToday');
            for (let i = 0; i < workToday.length; i++) {
                await envoy.checkOutWork(workToday[i].id);
            }
            await say(`You've checked out!`);
        } else {
            await say(`You don't appear to be checked in. Did you already check out?`)
        }
        
    }
    catch(error) {
        console.log(error);
    }
    
};

module.exports = { employeeCheckout };