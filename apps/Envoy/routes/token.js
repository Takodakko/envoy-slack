
const tokenOut = async (req, res) => {
    console.log(req)
    res.send(200, {});
}

const token = {
    path: '/token',
    method: ['POST'],
    handler: tokenOut
};

module.exports = { token };
