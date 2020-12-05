import React from 'react';
import ProductCounter from "./ProductCounter";

function ShowProductsComponent(props) {

    const {products}=props;

    return (
        <>
            {
                products.length ?
                    products.map(product => {
                        return (
                            <section key={product._id} className='prod-show-sec'>
                                <img alt={product.title}
                                     src='https://agro96.ru/uploadedFiles/eshopimages/big/ut000000965.jpg'
                                     className='product-show-img'/>
                                <section className='product-show-info'>
                                    <h2>{product.title}</h2>
                                    <p>{product.description}</p>
                                    <p>{product.cost}</p>
                                    <p>{product.count === 0 ? 'Нет в наличии' : product.count}</p>
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
