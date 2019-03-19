import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import Nav from './Nav'
import Products from './Products'
import Home from './Home'
import CreateProduct from './CreateProduct'
import axios from 'axios'

class App extends React.Component{
    constructor(){
        super()
        this.state ={
            products: []
        }
    }

    componentWillMount(){
        axios.get('/api/products')
            .then(resp => {
                this.state.products = this.state.products.concat(resp.data)
                this.setState(this.state.products)
            })
    }

    saveProduct = (product) =>{
        this.state.products = this.state.products.concat(product)
        this.setState(this.state.products)
    }

    handleDeleteItem = (id) =>{
        console.log(id)
        axios.delete(`/api/products/${id}`)
            .then((resp) => {
                console.log(resp)
                console.log(this.state.products.filter(product => product.id !== id))
                this.setState({products:this.state.products.filter(product => product.id !== id)})
            }) 
            .catch(error => console.log(error))
    }

    render(){
        const { products } = this.state
        const saleProducts = products.filter(product => product.discountPer > 0)
        return(
            <HashRouter>
                <div id="main">
                    <div id="header">
                        <Nav />
                       

                    </div>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/products' render={(props) => <Products products={products} handleDeleteItem={this.handleDeleteItem}/>}/>
                    <Route exact path='/products/sales' render={(props) => <Products products={saleProducts} handleDeleteItem={this.handleDeleteItem} />}/>
                    <Route exact path='/createproduct' render={(props) => <CreateProduct handleCreateProductChange={this.handleCreateProductChange} handleCreateProductSubmit={this.handleCreateProductSubmit} saveProduct={this.saveProduct}/>} />
                </div>
            </HashRouter>

        )
    }
}

export default App