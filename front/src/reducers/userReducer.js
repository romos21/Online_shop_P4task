import {handleActions} from 'redux-actions'
import {activeUserInfo} from '../constants/defaultState';
import {userAuthorization} from '../actions';

export default handleActions({
    [userAuthorization]: (state,{payload})=>{
        console.log(payload);
        return {
            ...payload,
        }
    }
},activeUserInfo);