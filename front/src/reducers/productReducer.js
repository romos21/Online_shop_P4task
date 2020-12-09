import {handleActions} from 'redux-actions'
import {productsList} from '../constants/defaultState';
import {productsSet, productsChangeProduct} from '../actions';

export default handleActions({
    [productsSet]: (state, {payload}) => {
        return [
            ...payload
        ];
    },
    [productsChangeProduct]: (state, {payload}) => {
        const resultBasket = state.map(product => {
            if (product._id === payload._id) {
                return payload;
            }
            return product;
            })
        return resultBasket;
    },
}, productsList);