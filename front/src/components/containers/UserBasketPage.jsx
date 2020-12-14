import React, {useEffect, useState} from 'react';
import '../../styles/components/UserBasketPage.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {basketAdd,userAuthorization} from "../../actions";
import ShowProductsComponent from "../pages/ShowProductsComponent";
import {ErrorMsgPage} from "../pages/ErrorMsgPage";
import Loader from "../pages/Loader,";
import {ChangePageNumber} from "../pages/ChangePageNumber";

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
    const [pagesCount, pagesCountSet] = useState(0);
    const [currentPage, currentPageSet] = useState(1);
    const limit = 1;

    useEffect(() => {
        console.log('awdwdawd');
        loaderSet(true);
        fetch(`basket/getBasket?user_id=${props.user._id}&skipValue=${(currentPage - 1) * limit}&limit=${limit}`)
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
    }, [currentPage])


    const buyAll=async ()=>{

        const response=await fetch(`/userHistory/setHistory`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                user_id: props.user._id,
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
                                <ShowProductsComponent
                                    products={props.userBasket}
                                />
                                <ChangePageNumber
                                    pagesCount={pagesCount}
                                    currentPageSet={currentPageSet}
                                    currentPage={currentPage}
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