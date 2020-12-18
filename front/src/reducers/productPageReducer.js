import {handleActions} from 'redux-actions'
import {currentPageForProducts} from '../constants/defaultState';
import {productPageSet} from '../actions';

export default handleActions({
    [productPageSet]: (state,{payload})=>{
        return payload;
    },
},currentPageForProducts);