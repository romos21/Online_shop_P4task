import {handleActions} from 'redux-actions'
import {currentPageForBasket} from '../constants/defaultState';
import {basketPageSet} from '../actions';

export default handleActions({
    [basketPageSet]: (state,{payload})=>{
        return payload;
    },
},currentPageForBasket);