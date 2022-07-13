
const validateOut = async (req, res) => {
    console.log(req.envoy)
}

const validate = {
    path: '/validate',
    method: ['POST'],
    handler: validateOut
};

module.exports = { validate };