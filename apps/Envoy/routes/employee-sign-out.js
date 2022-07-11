
/** Remove user status of working when they sign out from Envoy */
const employeeSignOutHandler = async (req, res) => {
    try {
        let userEmail = req.body.payload.attributes.email;
        console.log('exit');
        const webClient = req.webClient;
        if (userEmail.includes('+sdk')) {
            const start = userEmail.indexOf('+');
            userEmail = userEmail.slice(0, start) + userEmail.slice(start + 4);
        }
        const userObject = await webClient.users.lookupByEmail({
            token: webClient.token,
            email: userEmail
        });
        const userId = userObject.user.id;
        webClient.users.profile.set({
            user: userId,
            profile: {
                status_text: ``,
                status_emoji: '',
                status_expiration: 0
            }
        })
        res.status(200).send('Status updated');
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Failed to update status', 'utf-8');
    }
};

const employeeSignOut = {
    path: `/employee-sign-out`,
    method: ['POST'],
    handler: employeeSignOutHandler
};

module.exports = { employeeSignOut };
