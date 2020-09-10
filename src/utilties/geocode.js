const request = require('request')

const geocode = (address,callback) => {
  const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYW9kZXdhMzEiLCJhIjoiY2tlc29reWw3MWV0bjMzcXZkcTc4eDN4bSJ9.Nu921kj0P8mLlocR8CAbkA&limit=1";

  request({url: url2, json: true}, (error,response) => {
  if(error){
    callback("Unable to connect",undefined)
  }else if(response.body.message === "Not Found" || response.body.features[0] == null ){
    callback("Error location not found",undefined)
  }else{
    callback(undefined,{
      latitude : response.body.features[0].center[1],
      longitude : response.body.features[0].center[0],
      location : response.body.features[0].place_name
    })
  }
  })
}

module.exports = geocode
