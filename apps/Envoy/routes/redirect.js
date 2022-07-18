// Not used
const redirectHandler = async (req, res) => {
    console.log(req, 'req');
    console.log(req.body, 'req.body');
}

const redirect = {
    path: '/redirect',
    method: ['POST'],
    handler: redirectHandler
};

module.exports = { redirect };