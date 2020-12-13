import {handleActions} from 'redux-actions'
import {userHistory} from '../constants/defaultState';
import {historySet} from '../actions';

export default handleActions({
    [historySet]: (state,{payload})=>{
        return [
            ...payload,
        ]
    },
},userHistory);