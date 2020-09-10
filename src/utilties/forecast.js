const request = require('request')

const forecast = (latitude,longitude,callback) =>{
const url = "http://api.weatherstack.com/current?access_key=8893aeeb6a847b8ac59dd383faaae1cd&query=" + latitude + "," + longitude + "&units=f";

request({ url: url , json: true}, (error,response) => {
  if(error){
    callback("Unable to connect",undefined)
  }else if(response.body.success == false){
    callback("Error weather not found",undefined)
  }else{
  callback(undefined,response.body.current.weather_descriptions[0] + ". The latitude is " + latitude +
  " and The longitude is " + longitude );
}
})
}

module.exports = forecast
