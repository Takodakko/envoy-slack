
const authorizeOut = async (req, res) => {
    //console.log(req)
    console.log(req)
    res.send(200, {});
}

const authorize = {
    path: '/authorize',
    method: ['GET'],
    handler: authorizeOut
};

module.exports = { authorize };

//https://miguel-envoy.ngrok.io/
//authorize?client_id=979940347345.3632123722103
//&redirect_uri=https%3A%2F%2Fapp.envoy.com%2Fplatform%2Fbec0a26b-3679-4577-bf74-b716b29884bc%2Foauth2%2Fstep-0%2Fcallback
//&response_type=code
//&scope=+connections%3Awrite%2C+authorizations%3Aread
//&state=5fddceb3-c213-4375-b088-7d3978113cec

//https://envoyintegrations.slack.com/oauth?client_id=2151990311.2231735577&scope=channels%3Aread%2Cchat%3Awrite%2Ccommands%2Cgroups%3Aread%2Cusers%3Aread%2Cusers%3Aread.email&user_scope=users.profile%3Awrite&redirect_uri=https%3A%2F%2Fweb.envoy.com%2Fplatform%2Fslack%2Foauth2%2Fdefault%2Fcallback&state=ea47e5a0-2a12-481a-88b0-e0ea6c9d57a2&granular_bot_scope=1&single_channel=0&install_redirect=&tracked=1&response_type=code&team=