const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilties/geocode.js')
const forecast = require('./utilties/forecast.js')

const app = express()

const publicDirectory = path.join(__dirname,'../public')
const partialsDirectory = path.join(__dirname,'../views/partials')
hbs.registerPartials(partialsDirectory)

app.set('view engine','hbs')
app.use(express.static(publicDirectory))

app.get('',(req,res) => {
  res.render('index',{
  title: 'Main Page',
  name: 'Varo'
  })
})

app.get('/help',(req,res) => {
  res.render('help',{
  title: 'Help Page',
  name: 'Varo'
  })
})

app.get('/about',(req,res) => {
  res.render('about',{  
  title: 'About Page',
  name: 'Varo'
  })
})

app.get('/weather',(req,res) => {
  if(!req.query.address){
    return res.send({
      error : 'you need to add address'
    })
  }

  const address = req.query.address
  geocode(address,(error,data) => {
    if(error){
    return res.send({
      error : error
    })
    }


    forecast(data.latitude,data.longitude, (error, forecastData) => {
      if(error){
        return res.send({
          error : error
        })
      }
      res.send({
        Location : data.location,
        Weather : forecastData,
        Address : req.query.address
      })
    })

})
})




app.get('/help/*',(req,res) => {
  res.render('error',{
    error : 'Help Error 404'
  })
})

app.get('*',(req,res) => {
  res.render('error',{
    error : 'Error 404'
  })
})



app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
