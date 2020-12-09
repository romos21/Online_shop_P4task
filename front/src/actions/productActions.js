import {createActions} from 'redux-actions';

export const {
    productsSet,
    productsChangeProduct,
} = createActions(
    "PRODUCTS_SET",
    "PRODUCTS_CHANGE_PRODUCT",
);