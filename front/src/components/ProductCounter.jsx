import React, {useState} from 'react';
import '../styles/components/ProductCounter.css';
import classNames from 'classnames';
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';

import {basketAdd, productsSet} from "../actions";

const mapStateToProps = function (state) {
    return {
        user: state.userReducer,
    }
}

const mapDispatchToProps = {
    basketAdd
}

function ProductCounter(props) {

    const {product,user,basketAdd}=props;

    const btnAddState = 'Add To Basket';
    const btnRemoveState = 'Remove From Basket';

    const history=useHistory();
    const [btnTextContent, btnTextContentChange] = useState(btnAddState);
    const [productCount, productCountChange] = useState(0);

    const addOneToCount = (event) => {
        /*if(product.count<productCount+1){
            return;
        }*/
        if (productCount + 1 >= 0 && btnTextContent === btnRemoveState) {
            btnTextContentChange(btnAddState);
        }
        productCountChange(productCount + 1);
    }

    const removeOneFromCount = (event) => {
        /*if(product.count<productCount-1){
            return;
        }*/
        if (productCount - 1 < 0 && btnTextContent === btnAddState) {
            btnTextContentChange(btnRemoveState);
        }
        productCountChange(productCount - 1);
    }

    const changeBasket = async () => {
        if (!user.email) {
            history.push('/login');
        } else {
            const fetchBody={
                user_id: user._id,
                product: {
                    _id: product._id,
                    count: productCount,
                }
            }
            const response=await fetch('/basket/change', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(fetchBody),
            })
            const responseJSON=await response.json();
            console.log(responseJSON);
            if(user.basketProductsCount!==responseJSON){
                console.log('changed Basket Products Count')
            }
        }
    }

    return (
        <section className='set-counter-sec'>
            <div className='set-count-value-block'>
                <button onClick={removeOneFromCount} className='change-count-btn'>-</button>
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
