const Sequelize = require('sequelize');
const connection = new Sequelize('postgres://localhost/acme_products_sales');

const Product = connection.define('product', {
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    discountPer:{
        type:Sequelize.INTEGER,
        defaultValue:0,
        validate:{
            min:0,
            max:100
        }
    },
    status:{
        type:Sequelize.STRING,
        defaultValue:'instock',
        validate:{
            isIn: [['instock', 'backordered', 'discontinued']]
        }
    }
})

Product.insert = (product) =>{
    return Product.create({
        name:product.name, 
        price:product.price, 
        discountPer:product.discountPer, 
        status:product.status})
}

Product.delete = (productId) =>{
    return Product.destroy({where:{id:productId}})
}

Product.getAll = () =>{
    return Product.findAll();
}



module.exports = {connection, Product}