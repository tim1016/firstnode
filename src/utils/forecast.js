const request = require('request');


const forecast = (lat, long, callback) => {
    const key='0bba84bda756f57956b8e2be124fe5d4';
    const preKeyURL='https://api.darksky.net/forecast';
    const postKeyUrl=`${lat},${long}`;
    const url = `${preKeyURL}/${key}/${postKeyUrl}`;
    const requestOptions = {
        url,
        json:true
    }

    request(requestOptions, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(`Unable to find the location: ${lat}, ${long}`, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.');   
        }
    })    

}

module.exports = forecast;



