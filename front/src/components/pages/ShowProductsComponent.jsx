import React from 'react';
import ProductCounter from "../containers/ProductCounter";
import {noImageProduct} from "../../constants/constantImages";
import {Link} from "react-router-dom";

function ShowProductsComponent(props) {

    const {products} = props;

    return (
        <>
            {
                products.length ?
                    products.map(product => {
                        console.log(product.image);
                        return (
                            <section key={product._id} className='prod-show-sec'>
                                <Link to={"/productPage/"+product._id}>
                                    <img alt={product.title}
                                         src={product.image ? product.image : noImageProduct}
                                         className='product-show-img'/>
                                </Link>
                                <section className='product-show-info'>
                                    <h2>{product.title}</h2>
                                    <p>{product.description}</p>
                                    <p>Cost: {product.cost}$</p>
                                    <p>Count: {product.count === 0 ? 'Нет в наличии' : product.count}</p>
                                </section>
                                <ProductCounter product={product}/>
                            </section>
                        );
                    })
                    : null
            }
        </>
    );
}

export default ShowProductsComponent;
