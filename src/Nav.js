import React from 'react'
import { Link } from 'react-router-dom'
import Home from './Home';

class Nav extends React.Component{
    constructor(){
        super()
        this.state={
            links:[
                {path: '/', text:'Home', isActive:'active'},
                {path: '/products', text:'Products', isActive:''},
                {path: '/products/sales', text:'Sales', isActive:''},
                {path: '/createproduct', text:'Create', isActive:''}
            ]
        }
    }
   
    makeActive = (event) =>{
        const {links} = this.state
        links.map(link => {
            if (link.text === event.target.text){
                link.isActive = 'active'
            }else{
                link.isActive = 'inactive'
            }
        })
        this.setState({links})
    }

    render(){
        const{links} = this.state
    return (
        <div>
     
            <nav className="navbar navbar-dark">
            <ul className="nav nav-tabs">
                {
                    this.state.links.map(link => {
                        return(
                            <li key={link.text} className={`nav-item nav-link ${link.isActive}`}>
                                <Link onClick={this.makeActive} to={link.path}>{link.text}</Link>
                            </li>
                    
                        )
                    })

                // <li onClick={this.makeActive} className="nav-item nav-link"><Link to='/'><h2>Home</h2></Link></li>
                // <li className="nav-item nav-link"><Link to='/products'><h2>Products</h2></Link></li>
                // <li className="nav-item nav-link"><Link to='/products/sales'><h2>Sales</h2></Link></li>
                // <li className="nav-item nav-link"><Link to='/createproduct'><h2>Create</h2></Link></li>


                }
            </ul>
            </nav>
        </div>
    )
    }
}



export default Nav