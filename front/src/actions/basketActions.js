import {createActions} from 'redux-actions';

export const {
    basketAdd,
    basketChangeProduct,
} = createActions(
    "BASKET_ADD",
    "BASKET_CHANGE_PRODUCT",
);