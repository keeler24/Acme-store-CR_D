import React from 'react'
import { Redirect}  from 'react-router-dom'
import axios from 'axios'

class CreateProduct extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            price:0,
            discountPer:0,
            status:'',
            productRedirect:false,
            saleRedirect:false
        }
    }

    handleCreateProductChange = (event) =>{
        console.log(event.target.value)
        console.log(typeof event.target.value)
        if(event.target.name === "name"){
            this.setState({name:event.target.value})
        }else if (event.target.name === "price"){
            this.setState({price:event.target.value})
        }else if (event.target.name === "discountPer"){
            this.setState({discountPer:event.target.value})
        }else{
            this.setState({status:event.target.value})
        }
    }

    handleCreateProductSubmit = (event) =>{
        event.preventDefault()
        axios.post('/api/products', this.state)
            .then(resp => {
                this.props.saveProduct(resp.data)
                return resp.data
            })
            .then((data) => {
                console.log(data.discountPer)
                if(data.discountPer === 0){
                    console.log('a' );
                    this.setState({productRedirect:true})
                }else{
                    console.log('b');
                    this.setState({saleRedirect:true})
                }
            })
            .catch(error => console.log(error))
    }

    render(){
        const{productRedirect, saleRedirect} = this.state
        if(productRedirect === true){
            return <Redirect to='/products' />
        }

        if(saleRedirect === true){
            return <Redirect to='/products/sales' />
        }

        return(
            <div>
                <form onSubmit={this.handleCreateProductSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" 
                                name="name" 
                                type="text" 
                                onChange={this.handleCreateProductChange}/>
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input className="form-control" 
                                name="price" 
                                type="text" 
                                onChange={this.handleCreateProductChange}/>
                    </div>

                    <div className="form-group">
                        <label>Discount Percentage</label>
                        <input className="form-control" 
                                name="discountPer" 
                                type="text" 
                                onChange={this.handleCreateProductChange}/>
                    </div>
                    
                    <div>
                        <label>Availability</label>
                        <select className="form-control" onChange={this.handleCreateProductChange}>
                            <option > </option>
                            <option >instock</option>
                            <option>backordered</option>
                            <option>discontinued</option>
                        </select>
                    </div>
                    <div>
                        <br></br>
                        <button type="submit">Create</button><br />
                    </div>
          
                    
                </form>


            </div>
        )
    }
}

export default CreateProduct