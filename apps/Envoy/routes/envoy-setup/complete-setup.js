
const setupComplete = async (req, res) => {
    
    //Slack tokens are available in req.envoy.payload after oauthing with slack from envoy
        //This is due to envoy adding the payload after a hitting the validation url
    //SAVE TOKENS
    
    //console.log(req.envoy)
    //console.log(req.envoy.body.meta.config)
    //console.log(req.envoy.body)

    // console.log(req.webClientBot)
    // console.log(req.webClientUser)
    res.status(200).send({})
}

const completeSetup = {  
    path: '/complete-setup',
    method: ['POST'],
    handler: setupComplete
};

module.exports = { completeSetup };