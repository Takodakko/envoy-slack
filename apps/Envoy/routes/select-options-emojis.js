const selectEmojis = async (req, res) => {
    res.status(200).send([
        {
          "label": ":church: ⛪",
          "value": ":church:"
        },
        {
          "label": ":office: \uD83C\uDFE2",
          "value": ":office:"
        },
        {
          "label": ":factory: \uD83C\uDFED",
          "value": ":factory:"
        },
        {
          "label": ":classical_building: \uD83C\uDFDB️",
          "value": ":classical_building:"
        },
        {
          "label": ":hospital: \uD83C\uDFE5",
          "value": ":hospital:"
        },
        {
          "label": ":bank: \uD83C\uDFE6",
          "value": ":bank:"
        },
        {
          "label": ":hotel: \uD83C\uDFE8",
          "value": ":hotel:"
        },
        {
          "label": ":convenience_store: \uD83C\uDFEA",
          "value": ":convenience_store:"
        },
        {
          "label": ":school: \uD83C\uDFEB",
          "value": ":school:"
        },
        {
          "label": ":department_store: \uD83C\uDFEC",
          "value": ":department_store:"
        },
        {
          "label": ":european_castle: \uD83C\uDFF0",
          "value": ":european_castle:"
        },
        {
          "label": ":passenger_ship: \uD83D\uDEF3️",
          "value": ":passenger_ship:"
        },
        {
          "label": ":rocket: \uD83D\uDE80️",
          "value": ":rocket:"
        },
        {
          "label": ":movie_camera: \uD83C\uDFA5",
          "value": ":movie_camera:"
        },
        {
          "label": ":stadium: \uD83C\uDFDF️",
          "value": ":stadium:"
        },
        {
          "label": ":building_construction: \uD83C\uDFD7️️",
          "value": ":building_construction:"
        },
        {
          "label": ":post_office:  \uD83C\uDFE3",
          "value": ":post_office:"
        },
        {
          "label": ":european_post_office: \uD83C\uDFE4",
          "value": ":european_post_office:"
        },
        {
          "label": ":school: \uD83C\uDFEB",
          "value": ":school:"
        },
        {
          "label": ":japanese_castle: \uD83C\uDFEF",
          "value": ":japanese_castle:"
        }
    ])
}

const selectOptionsEmojis = {  
    path: '/select-options-emojis',
    method: ['POST'],
    handler: selectEmojis
};

module.exports = { selectOptionsEmojis };