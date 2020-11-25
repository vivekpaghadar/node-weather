const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=1158f6b37a62ea126c167cd6d80abbe6&units=metric"
    request({url: url,json: true},(error,response) =>{
        if(error){
            callback('unable to connect to weather services',undefined)
        }else if(response.body.error){
            callback('unable to find location',undefined)
        }else{
            callback('undefined', 
            'It is currently '+JSON.parse(response.body.main.temp)+' celceous temprature with wind speed '+JSON.parse(response.body.wind.speed))

        }
    })
}

module.exports = forecast


