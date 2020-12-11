import React, {useEffect, useState} from 'react';
import '../../styles/components/UserBasketPage.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {basketAdd,userAuthorization} from "../../actions";
import ShowProductsComponent from "../pages/ShowProductsComponent";
import {ErrorMsgPage} from "../pages/ErrorMsgPage";
import Loader from "../pages/Loader,";

const mapStateToProps = function (state) {
    return {
        userBasket: state.basketReducer,
        user: state.userReducer,
        products: state.productReducer,
    }
}

const mapDispatchToProps = {
    basketAdd,
    userAuthorization
}

const UserBasketPage = props => {

    const [errMsg, errMsgSet] = useState(null);
    const [loader, loaderSet] = useState(false);

    useEffect(() => {
        loaderSet(true);
        fetch(`basket/getBasket?user_id=${props.user._id}`)
            .then(res => res.json())
            .then(data => {
                if (data.errMsg) {
                    console.log(data);
                    errMsgSet(data.errMsg);
                } else {
                    props.basketAdd(data.basket);
                }
            })
        loaderSet(false);
    }, [])

    const buyAll=async ()=>{
        const response=await fetch(`/userHistory/setHistory`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                user_id: props.user._id,
                newBuy: props.userBasket,
            }),
        });
        const responseJSON=await response.json();
        props.basketAdd(responseJSON.clearedBasket);
        props.userAuthorization({basketProductsCount:responseJSON.clearedBasket.length})
    }

    return (
        <>
            {
                loader ? <Loader/>
                    : errMsg ?
                    <ErrorMsgPage errMsg={errMsg}/>
                    :
                    props.userBasket.length ?
                        (
                            <>
                                <ShowProductsComponent products={props.userBasket}/>
                                <div className='buy-all-block'>
                                    <button onClick={buyAll} className='buy-products'>Buy All!</button>
                                </div>
                            </>
                        )
                        : <section className='product-sec no-product'>
                            No Products here, let's buy here
                            <Link to='/'>CATALOG</Link>
                        </section>
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBasketPage);