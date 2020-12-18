import React, {useEffect, useState, useRef} from 'react';
import '../../styles/components/ProductsListPage.css';
import {connect} from "react-redux";
import {productsSet, productPageSet} from "../../actions";
import ShowProductsComponent from "../pages/ShowProductsComponent";
import ChangePageNumber from "../pages/ChangePageNumber";
import {ErrorMsgPage} from "../pages/ErrorMsgPage";

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
    const limit = 3;

    useEffect(() => {
        const skipValue = (productPage - 1) * limit;
        fetch(`products/get/?skipValue=${skipValue}&limit=${limit}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.errMsg) {
                    errMsgSet(data.errMsg);
                } else if (data.products.length) {
                    productsSet(data.products);
                    pagesCountSet(data.pagesCount);
                }
            }).catch(err => {
            console.log(err);
            return err;
        })

    }, [productPage])

    return (
        <>
            {errMsg ? <ErrorMsgPage errMsg={errMsg}/>
                :
                <>
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
