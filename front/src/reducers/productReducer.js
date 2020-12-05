import {handleActions} from 'redux-actions'
import {productsList} from '../constants/defaultState';
import {productsSet} from '../actions';

export default handleActions({
    [productsSet]:(state, {payload})=>{
        return [
            ...payload
        ];
    }
}, productsList);