
const Envoy = require('../../../../Envoy');

/**  
* Slash command to check in to the office via Envoy.
*/

const employeeCheckin = async function({ack, say, context, payload, client}) {
    try {
        ack();
        const envoy = Envoy.getInstance();
        const userId = payload.user_id;
        const user = await client.users.profile.get({user: userId});
        const userEmail = user.profile.email;
        // This makes the request look for an approved work time as late as four hours from now. What time frame should we be using?
        // Or is there a better way?
        const now = Date.now() + (4 * 60 * 60 * 1000);
        const today = new Date(now).toISOString();
        // Like above, looks for a time no earlier than half a day ago.
        const yesterdayUnix = now - (12 * 60 * 60 * 1000);
        const yesterday = new Date(yesterdayUnix).toISOString();
        // const envoyWorkSchedule = await envoy.API.workSchedules({userEmails: [userEmail], expectedArrivalAtBefore: today, expectedArrivalAtAfter: yesterday});
        const envoyWorkSchedule = await envoy.API.workSchedules({userEmails: [userEmail]});
        console.log(envoyWorkSchedule, 'envoyWorkSchedule');
        const workToday = envoyWorkSchedule.filter((work) => {
            // Check for registered and approved schedules where the user has not checked in yet.
            // Checking in when status is PENDING does seem to work, but it also throws an error.
            if (work.status === 'APPROVED' && work.arrivedAt === null) {
                return work;
            }
        })
        if (workToday.length > 0) {
            // console.log(workToday, 'workToday');
            for (let i = 0; i < workToday.length; i++) {
                await envoy.API.checkInWork(workToday[i].id);
            }
            await say(`You've checked in!`);
        } else {
            await say(`You're either not registered for today, or still waiting approval.`)
        }
    }
    catch(error) {
        console.log(error);
    }
    
};

module.exports = { employeeCheckin };