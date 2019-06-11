const request = require('request');

const geocode = (address, callback) => {
    const preKey = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const params = encodeURIComponent(address);
    const postParams = '.json?access_token='; 
    const key='pk.eyJ1IjoicmVzb25hbmNlb25jbCIsImEiOiJjanN4bDZjbnkwbjBrNDNzMW9iYXd4cjd2In0.QfmjiKEboScVE0bCpFa0TQ';
    const geocodeURL = `${preKey}${params}${postParams}${key}`;

    request({ url: geocodeURL, json: true }, (error, {body}) => { 
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            error = undefined;
            const data = {
                location: body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            }
            callback(error, data);
        }
    })
}

module.exports = geocode;