const selectHours = async (req, res) => {
    res.status(200).send([
        {
          "label": "Until sign-out",
          "value": 0
        },
        {
          "label": "1 hour",
          "value": 1
        },
        {
          "label": "2 hours",
          "value": 2
        },
        {
          "label": "4 hours",
          "value": 4
        },
        {
          "label": "6 hours",
          "value": 6
        },
        {
          "label": "8 hours",
          "value": 8
        },
        {
          "label": "10 hours",
          "value": 10
        },
        {
          "label": "12 hours",
          "value": 12
        }
    ])
}

const selectOptionsHours = {  
    path: '/select-options-hours',
    method: ['POST'],
    handler: selectHours
};

module.exports = { selectOptionsHours };