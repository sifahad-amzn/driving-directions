const googleMaps = require('@google/maps');

module.exports.test = function() {
  this.getDirections("NASA Sunnyvale", "Google HQ").then(function(obj){
    console.log(obj);
    console.log(obj.distance.text);
    console.log(obj.duration.text);
  });
};

module.exports.getDirections = function(start, end) {
  return new Promise(function(resolve, reject){
    start = start || 'Disneyland';
    end = end || 'Universal Studios Hollywood';
    var temp;

    var directions = {start: start, end: end};
    console.log(JSON.stringify(directions));

    var googleMapsClient = googleMaps.createClient({
      key: 'AIzaSyC_XU514F53rdBKza1UdX69zdrTkGi9IU8',
      Promise: Promise
    });

    googleMapsClient.directions({
      origin: start,
      destination: end,
      mode: 'driving'
    }).asPromise()
    .then((response) => {
      temp = response.json;
      if (temp.hasOwnProperty('routes')){
        temp = temp.routes;
        resolve(temp[0].legs[0]);
      } else {
        resolve(temp);
      }
    }).catch((err)=> {
      reject(err);
    });
  });
};
