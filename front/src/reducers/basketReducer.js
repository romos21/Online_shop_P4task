import {handleActions} from 'redux-actions'
import {userBasket} from '../constants/defaultState';
import {basketAdd} from '../actions';

export default handleActions({
    [basketAdd]:(state, {payload})=>{
        return [
            ...payload,
        ];
    },
}, userBasket);