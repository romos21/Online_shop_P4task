import React, {useEffect} from 'react';
import '../styles/components/UserBasketPage.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {basketAdd} from "../actions";
import ShowProductsComponent from "./ShowProductsComponent";

const mapStateToProps = function (state) {
    return {
        userBasket: state.basketReducer,
        user: state.userReducer,
        products: state.productReducer,
    }
}

const mapDispatchToProps = {
    basketAdd,
}

const UserBasketPage = props => {

    useEffect(() => {
        fetch(`basket/getBasket`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({user_id: props.user._id}),
        })
            .then(res => res.json())
            .then(data=> {
                props.basketAdd(data.basket);
            })

    }, [])

    return (
        <>
            {
                props.userBasket.length ?
                    (<ShowProductsComponent
                        products={props.userBasket}
                    />)
                    : <section className='product-sec no-product'>
                        No Products here, let's buy here
                        <Link to='/'>CATALOG</Link>
                    </section>
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBasketPage);