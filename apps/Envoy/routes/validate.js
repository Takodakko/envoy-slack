
const validateOut = async (req, res) => {
    
    res.status(200).send({})
}

const validate = {  
    path: '/validate',
    method: ['POST'],
    handler: validateOut
};

module.exports = { validate };