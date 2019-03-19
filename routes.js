const express = require('express')
const router = express.Router();
const { Product } = require('./db')


router.get('/products', (req, res, next) =>{
    Product.getAll()
        .then(resp =>{
            res.send(resp)
        })
        .catch(next)
})

router.post('/products', (req, res, next) =>{
    Product.insert(req.body)
        .then((product) => {
            res.json(product).end()
        })
        .catch(next)
})

router.delete('/products/:id', (req, res, next)=>{
    Product.delete(req.params.id)
        .then(() => res.status(204).end())
        .catch(next)
})

module.exports = router