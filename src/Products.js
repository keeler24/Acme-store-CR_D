import React from 'react'

const Products = (props) => {
    const { products, handleDeleteItem } = props
    
    return(
        <div>
            {
               
                products.map(product => {
                    const salePrice = product.price * (1-product.discountPer/100)
                    let badgeColor = 'badge badge-success'
                    if (product.status !== 'instock') badgeColor= 'badge badge-warning'
                    
                    if(product.discountPer > 0){
                    
                        return (

                            <ul key={product.id} className="list-group">
                                <li className="list-item">
                                    <span>{product.name}</span><br/>
                                    <span style={{textDecoration: 'line-through'}}>{product.price}</span> <br />
                                    <span>{salePrice}</span><br />
                                    <span className={badgeColor}>{product.status}</span><br />
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(product.id)}>DELETE</button>
                                </li>

            
                                
                                <br></br>
                            </ul>
                            
    
                        )
                    }
                    return (
                        <ul key={product.id} className="list-group">
                            <li className="list-item">
                                <span>{product.name}</span><br/>
                                <span>{product.price}</span> <br />
                                <span className={badgeColor} >{product.status}</span><br />
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(product.id)}>DELETE</button>
                            </li>
                        </ul>
                    )
                    

               })

            }
        </div>
    )
}

export default Products