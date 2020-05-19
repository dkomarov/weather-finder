if (process.env.NODE_ENV !== 'production') { // set by default by Node
  require('dotenv').config({path: '.env'})
}

const axios = require('axios')
const API_KEY = process.env.API_KEY
const Weather = require('../model/Weather')

exports.renderHomePage = (req, res) => {
  res.render('index')
}

exports.getWeather = (req, res) => {
  // res.send(`You typed ${req.body.city}.`)
  const city = req.body.city
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`

  const weather = new Weather(req.body.city)

  weather.validateUserInput()

  if (weather.errors.length) {
    res.render('index', {
      error: weather.errors.toString()
    })
  } else {
    axios.get(url).then((response) => {
      console.log(response) // display API data
      const { temp: temperature } = response.data.main
      const { name: location } = response.data
      res.render('index', {
        weather: `It is currently ${temperature} in ${location}.`
      })
    }).catch((error) => {
      console.log(error)
    })
   }
  }
  
exports.renderAboutPage = (req, res) => {
  res.render('about')
}