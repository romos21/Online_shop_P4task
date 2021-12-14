import React, {useEffect, useRef, useState} from 'react';
import ProductCounter from "../containers/ProductCounter";
import {noImageProduct} from "../../constants/constantImages";
import '../../styles/components/ProductComponent.css';


function ProductComponent(props) {

    const {products, match, setProducts, user} = props;
    const {id} = match.params;
    const areaRef = useRef(null);
    const [comments,setComments] = useState([]);

    const product = products.find(product => product._id === id);

    useEffect(async () => {
        const response = await fetch(`http://localhost:5000/products/getComments?product=${id}`);
        const responseJSON = await response.json();
        setComments(responseJSON);
    },[]);

    const setComment = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:5000/products/addComment`,{
            method: "POST",
            body: JSON.stringify({
              product: id,
              user: user.token,
              text: areaRef.current.value,
            })
        });
        const responseJSON = await response.json();
        setComments(responseJSON);
    }

    return (
        <>
            <section className='prod-show-sec'>
                <img alt={product.title}
                     src={product.image ? product.image : noImageProduct}
                     className='product-show-img'/>
                <section className='product-show-info'>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Cost: {product.cost}$</p>
                    <p>Count: {product.count === 0 ? 'Нет в наличии' : product.count}</p>
                </section>
                <ProductCounter product={product}/>
            </section>
            {
                comments.length?
                    comments.map(comment => (
                        <div>{comment.text}</div>
                    ))
                    :null
            }
            <form className='comment-form'>
                <textarea className="comment-area"/>
                <button
                    ref={areaRef}
                    className="set-comment-btn"
                    onClick={setComment}
                >
                    Comment
                </button>
            </form>
        </>
    );
}

export default ProductComponent;
