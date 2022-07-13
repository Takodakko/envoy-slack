
const tokenOut = async (req, res) => {
    res.send(200, {});
}

const token = {
    path: '/token',
    method: ['POST'],
    handler: tokenOut
};

module.exports = { token };
