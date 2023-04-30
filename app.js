// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')

const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase().trim()) ||
    restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase().trim())
  )
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword })
})


app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantDetail = restaurantList.results.filter(restaurant => restaurant.id === Number(req.params.restaurant_id))
  res.render('show', { restaurantDetail: restaurantDetail[0] })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})