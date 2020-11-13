import React from 'react';
import '../styles/components/ProductsAddPage.css';

function ProductsAddPage() {
    return (
        <section className='prod-add-sec'>
            <h1 className='prod-add-head'>Add Product</h1>
            <form className='prod-add-form'>
                <input className='prod-add-input' required type='text' placeholder='description'/>
                <input className='prod-add-input' required type='file' placeholder='image'/>
                <input className='prod-add-input' required type='number' placeholder='cost'/>
                <input className='prod-add-input' required type='number' placeholder='count'/>
                <button className='prod-add-button' type='submit'>+</button>
            </form>
        </section>
    );
}

export default ProductsAddPage;
