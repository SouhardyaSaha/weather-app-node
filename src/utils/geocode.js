const request = require('request');

const getLocationInformation = (location, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoic291aGFyZHlhIiwiYSI6ImNrN3d5c2szZzA3NjMzbGxoMmFsOXg3cWwifQ.aTGmT3IGwX1HTdHhy7L2aw&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            // The value of the other parameter in the callback function will be automatically undefined
            callback('Unable to connect to location services..!');

        } else if (body.features.length === 0) {

            callback('No record found');

        } else {

            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;

            const data = {
                longitude,
                latitude,
                location
            };

            callback(undefined, data);
        }

    });

};

module.exports = {
    getLocationInformation,
};