import React, {useEffect} from 'react';
import '../styles/components/ProductsListPage.css';
import {connect} from "react-redux";
import {productsSet} from "../actions";
import ShowProductsComponent from "./ShowProductsComponent";

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

    useEffect(() => {
        fetch('/products/get')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.length) {
                    productsSet(data);
                }
            }).catch(err => {
            console.log(err);
            return err;
        })
    }, [])

    return (
        <ShowProductsComponent
            products={products}
        />
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListPage);
