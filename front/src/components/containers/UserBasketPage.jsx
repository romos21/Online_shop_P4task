import React, {useEffect, useState} from 'react';
import '../../styles/components/UserBasketPage.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {basketAdd,userAuthorization,basketPageSet} from "../../actions";
import ShowProductsComponent from "../pages/ShowProductsComponent";
import {ErrorMsgPage} from "../pages/ErrorMsgPage";
import Loader from "../pages/Loader,";
import {ChangePageNumber} from "../pages/ChangePageNumber";

const mapStateToProps = function (state) {
    return {
        userBasket: state.basketReducer,
        user: state.userReducer,
        products: state.productReducer,
        basketPage: state.basketPageReducer,
    }
}

const mapDispatchToProps = {
    basketAdd,
    userAuthorization,
    basketPageSet,
}

const UserBasketPage = props => {

    const {user,basketPage,basketPageSet}=props;

    const [errMsg, errMsgSet] = useState(null);
    const [loader, loaderSet] = useState(false);
    const [pagesCount, pagesCountSet] = useState(0);
    const limit = 3;

    useEffect(() => {
        errMsgSet(null);
        loaderSet(true);
        const skipValue=(basketPage - 1) * limit;
        fetch(`basket/getBasket?token=${user.token}&skipValue=${skipValue}&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                if (data.errMsg) {
                    errMsgSet(data.errMsg);
                } else {
                    props.basketAdd(data.basket);
                    pagesCountSet(data.pagesCount);
                }
            })
        loaderSet(false);
    }, [basketPage,user.token])


    const buyAll=async ()=>{

        const response=await fetch(`/userHistory/setHistory`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                token:props.user.token,
            }),
        });
        const responseJSON=await response.json();
        if(responseJSON.errMsg){
            errMsgSet(responseJSON.errMsg);
        } else {
            props.basketAdd(responseJSON.clearedBasket);
            props.userAuthorization({basketProductsCount:responseJSON.clearedBasket.length})
        }
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
                                <ShowProductsComponent
                                    products={props.userBasket}
                                />
                                <ChangePageNumber
                                    pagesCount={pagesCount}
                                    currentPageSet={basketPageSet}
                                    currentPage={basketPage}
                                />
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