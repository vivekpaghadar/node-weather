const path = require('path');
const express = require('express');
const hbs = require('hbs'); 
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
 
const publicdirectorypath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'vivek paghdar'
    })
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        res.send({
            error : 'you must provide search parameter'
        })
    }else{
        res.send({
            products:[]
        })
    }
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
           error: 'you not provided address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} ={}) =>{
            forecast(latitude,longitude,(error,forecastData) =>{
                
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
                
            })
        
        

    })
    
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'vivek'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'help',
        name: 'vivek'
    })
})

app.get('/help/*',(req, res) =>{
    res.send('help content not found')
})

console.log(publicdirectorypath)
app.use(express.static(publicdirectorypath))

app.listen(3000,()=>{
    console.log('server is on port 3000')
})
