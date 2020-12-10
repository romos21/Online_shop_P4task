import {handleActions} from 'redux-actions'
import {activeUserInfo} from '../constants/defaultState';
import {userAuthorization} from '../actions';

export default handleActions({
    [userAuthorization]: (state,{payload})=>{
        return {
            ...state,
            ...payload,
        }
    },
},activeUserInfo);