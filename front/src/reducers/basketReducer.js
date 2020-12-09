import {handleActions} from 'redux-actions'
import {userBasket} from '../constants/defaultState';
import {basketAdd,basketChangeProduct} from '../actions';

export default handleActions({

    [basketAdd]:(state, {payload})=>{
        return [
            ...payload,
        ];
    },
    [basketChangeProduct]:(state, {payload})=>{
        const resultBasket=payload.count?
            state.map(product=>{
            if(product._id===payload._id){
                return payload;
            }
            return product;
            })
            :state.filter(product=>product._id!==payload._id);
        return [
            ...resultBasket
        ];
    },
}, userBasket);