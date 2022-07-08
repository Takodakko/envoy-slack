

const employeeSignOutFunction = async (req, res) => {
    try {
        console.log(req.body, 'exit');
        res.status(200).send('Status updated');
        
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Failed to update status', 'utf-8');
    }
};

const employeeSignOut = {
    path: `/employee-sign-out`,
    method: ['POST'],
    handler: employeeSignOutFunction
};

module.exports = { employeeSignOut };
