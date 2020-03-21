const request = require('request');

const getForecastInformation = (longitude, latitude, callback) => {

    const url = `https://api.darksky.net/forecast/0e3ece08d22a267e351be30ef9e0eb0d/${longitude},${latitude}?exclude=minutely,hourly,daily,alerts,flags&units=auto`;

    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {

            callback('Unable to connect to weather services..!!');

        } else if (body.error) {

            callback(body.error);

        } else {
            const { temperature: temp, precipProbability: rainProbability, summary } = body.currently;

            const data = {
                temp,
                rainProbability,
                summary
            };

            callback(undefined, data);
        }
    });

};

module.exports = {
    getForecastInformation,
}