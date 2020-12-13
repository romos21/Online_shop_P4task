import React, {useEffect, useState} from 'react';
import '../../styles/components/ProductsListPage.css';
import {connect} from "react-redux";
import {productsSet} from "../../actions";
import ShowProductsComponent from "../pages/ShowProductsComponent";
import classNames from 'classnames';
import {ChangePageNumber} from "../pages/ChangePageNumber";

const mapStateToProps = function (state) {
    return {
        products: state.productReducer,
    }
}

const mapDispatchToProps = {
    productsSet,
}

function ProductsListPage(props) {

    const {productsSet, products} = props;

    const [pagesCount, pagesCountSet] = useState(0);
    const [currentPage, currentPageSet] = useState(1);
    const limit = 1;

    useEffect(() => {
        console.log('here');
        fetch(`products/get/?skipValue=${(currentPage - 1) * limit}&limit=${limit}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.products.length) {
                    productsSet(data.products);
                    pagesCountSet(data.pagesCount);
                }
            }).catch(err => {
            console.log(err);
            return err;
        })
    }, [currentPage])

    return (
        <>
            <ShowProductsComponent
                requestUrl={'products/get/'}
                products={products}
            />
            <ChangePageNumber
                pagesCount={pagesCount}
                currentPageSet={currentPageSet}
                currentPage={currentPage}
            />
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListPage);
