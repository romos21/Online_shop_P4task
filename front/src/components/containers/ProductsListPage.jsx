import React, {useEffect, useState, useRef} from 'react';
import '../../styles/components/ProductsListPage.css';
import {connect} from "react-redux";
import {productsSet, productPageSet} from "../../actions";
import ShowProductsComponent from "../pages/ShowProductsComponent";
import ChangePageNumber from "../pages/ChangePageNumber";
import {ErrorMsgPage} from "../pages/ErrorMsgPage";
import {SearchPage} from "../pages/SearchPage";

const mapStateToProps = function (state) {
    return {
        products: state.productReducer,
        productPage: state.productPageReducer,
    }
}

const mapDispatchToProps = {
    productsSet,
    productPageSet
}

function ProductsListPage(props) {

    const {productPage, productPageSet, productsSet, products} = props;

    const [pagesCount, pagesCountSet] = useState(0);
    const [errMsg, errMsgSet] = useState('');
    const searchInputRef = useRef(null);
    const limit = 3;


    useEffect(() => {
        searchProducts();
    }, [productPage])

    const searchProducts = (searchValue) => {
        const skipValue = (productPage - 1) * limit;
        if(!searchValue){
            searchValue='';
        }
        fetch(`products/get/?skipValue=${skipValue}&limit=${limit}&searchValue=${searchValue}`)
            .then((res) => {
                if(!res.ok){
                    errMsgSet('No products');
                    return;
                }
                return res.json();
            })
            .then((data) => {
                if (data.errMsg) {
                    errMsgSet(data.errMsg);
                } else if (data.products.length) {
                    productsSet(data.products);
                    if(data.pagesCount!==pagesCount) {
                        pagesCountSet(data.pagesCount);
                    }
                }
            }).catch(err => {
            console.log(err);
            return err;
        })
    }
    return (
        <>
            {errMsg ? <ErrorMsgPage errMsg={errMsg}/>
                :
                <>
                    <SearchPage
                        searchInputRef={searchInputRef}
                        searchStart={searchProducts}
                    />
                    <ShowProductsComponent
                        requestUrl={'products/get/'}
                        products={products}
                    />
                    <ChangePageNumber
                        currentPage={productPage}
                        currentPageSet={productPageSet}
                        pagesCount={pagesCount}
                    />
                </>
            }
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListPage);
