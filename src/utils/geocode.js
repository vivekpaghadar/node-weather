const request = require('request')

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1Ijoidml2ZWtwYWdoZGFyIiwiYSI6ImNraHUyZGlreTBla2oyeHBoeWVtOW9vOW4ifQ.Vf4gSK7axOk23E-GgkhSFA"

    request ({url : url,json : true},(error,response) => {
        if (error){
            callback('unable to connect locatio services',undefined)
        }
        else if(response.body.features.length === 0){
            callback('unable to location, try again',undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
        })
    }
})
}

module.exports = geocode

