
const validateOut = async (req, res) => {
    
    //Slack tokens are available in req.envoy.payload after oauthing with slack from envoy
        //This is due to envoy adding the payload after a hitting the validation url
    //SAVE TOKENS
    console.log(req.envoy.body.payload)
    console.log(req.envoy.body.meta.config)
    res.status(200).send({})
}

const validate = {  
    path: '/validate',
    method: ['POST'],
    handler: validateOut
};

module.exports = { validate };