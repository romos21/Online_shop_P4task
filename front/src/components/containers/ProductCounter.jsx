import React, {useState} from 'react';
import '../../styles/components/ProductCounter.css';
import classNames from 'classnames';
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';

import {basketChangeProduct, productsChangeProduct,userAuthorization} from "../../actions";

const mapStateToProps = function (state) {
    return {
        user: state.userReducer,
        basket: state.basketReducer,
    }
}

const mapDispatchToProps = {
    basketChangeProduct,
    productsChangeProduct,
    userAuthorization
}

function ProductCounter(props) {

    const {product,basket,user,userAuthorization,basketChangeProduct,productsChangeProduct}=props;

    const btnAddState = 'Add To Basket';
    const btnRemoveState = 'Remove From Basket';

    const history=useHistory();
    const [btnTextContent, btnTextContentChange] = useState(btnAddState);
    const [productCount, productCountChange] = useState(0);

    const addOneToCount = () => {
        if(productCount+1>product.count){
            return;
        }
        if (productCount + 1 >= 0 && btnTextContent === btnRemoveState) {
            btnTextContentChange(btnAddState);
        }
        productCountChange(productCount + 1);
    }

    const removeOneFromCount = () => {
        const productToRemove=basket.find(el=>el._id===product._id);
        if(productToRemove.count+productCount-1<0){
            return;
        }
        if (productCount - 1 < 0 && btnTextContent === btnAddState) {
            btnTextContentChange(btnRemoveState);
        }
        productCountChange(productCount - 1);
    }

    const changeBasket = async () => {
        if (!user.email) {
            history.push('/login');
        } else {
            const stateForReturn=history.location.pathname==='/'?'main':'basket';
            const fetchBody={
                token: user.token,
                stateForReturn: stateForReturn,
                product: {
                    _id: product._id,
                    count: productCount,
                }
            }
            const response=await fetch('/basket/change', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(fetchBody),
            })
            const responseJSON=await response.json();
            if(user.basketProductsCount!==responseJSON.basketLength){
                userAuthorization({basketProductsCount:responseJSON.basketLength});
            }
            if(stateForReturn==='main'){
                productsChangeProduct(responseJSON.product);
            } else {
                basketChangeProduct(responseJSON.product);
            }
            productCountChange(0);
            btnTextContentChange(btnAddState);
        }
    }

    return (
        <section className='set-counter-sec'>
            <div className='set-count-value-block'>
                {
                    history.location.pathname==='/basket'?
                        <button onClick={removeOneFromCount} className='change-count-btn'>-</button>
                        :null
                }
                <span>{productCount}</span>
                <button onClick={addOneToCount} className='change-count-btn'>+</button>
            </div>
            <button
                onClick={changeBasket}
                className={
                    classNames('product-button',{
                        'remove-state': btnTextContent === btnRemoveState,
                        'add-state': btnTextContent === btnAddState,
                    })
                }
                type='submit'
            >
                {btnTextContent}
            </button>
        </section>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductCounter);
