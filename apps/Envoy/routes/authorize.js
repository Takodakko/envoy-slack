
const authorizeOut = async (req, res) => {
    //console.log(req)
    console.log(req)
    res.send(200);
}

const authorize = {
    path: '/authorize',
    method: ['GET'],
    handler: authorizeOut
};

module.exports = { authorize };