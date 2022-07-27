
const tokenOut = async (req, res) => {
    console.log(req.body, 'req.body in /token');
    // console.log(res, 'res in /token');
    res.status(200).send({});
}

const token = {
    path: '/token',
    method: ['POST'],
    handler: tokenOut
};

module.exports = { token };
