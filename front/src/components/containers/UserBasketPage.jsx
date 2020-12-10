import React, {useEffect, useState} from 'react';
import '../../styles/components/UserBasketPage.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {basketAdd} from "../../actions";
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

    return (
        <>
            {
                loader? <Loader/>
                :errMsg ?
                    <ErrorMsgPage errMsg={errMsg}/>
                    :
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