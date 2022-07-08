// const { boltHandler } = require('../../../SlackHelper');
// Defining this route as a ExpressReceiver route as we need a param passed in
const employeeSignInFunction = async (req, res) => {
    try {
        console.log(req.body, req.envoy, 'meta');
        console.log(req.envoy.installStorage, 'install storage');
        // const event = {
        //     body: req.body
        // };
        // boltHandler(event);
        res.status(200).send('Status updated');
        

        
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Failed to update status', 'utf-8');
    }
};

const employeeSignIn = {
    path: `/employee-sign-in`,
    method: ['POST'],
    handler: employeeSignInFunction
};

module.exports = { employeeSignIn };
