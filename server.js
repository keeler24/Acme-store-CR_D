const express = require('express')
const { connection, Product } = require('./db')
const app = express();
const router = require('./routes')
const PORT = process.env.PORT || 1337


app.use(express.json())
app.use('/api/', router)
app.use(express.static('dist'))



app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html')
})


connection.sync({force:true})
    .then( () => {
        return Promise.all([
            Product.insert({name:'Socks', price:5, discountPer:0, status:'discontinued'}),
            Product.insert({name:'Red Bull', price:10, discountPer:0, status:'instock'}),
            Product.insert({name:'Ukuele', price:55, discountPer:5, status:'discontinued'}),
            Product.insert({name:'Bicycle', price:300, discountPer:15, status:'backordered'})
         ])
    })
    .then( () => {
        console.log(`Listening on port ${PORT}`)
        app.listen(PORT)
    })
    .catch(error => console.log(error))


