import userReducer from "./userReducer";
import productReducer from "./productReducer";
import basketReducer from "./basketReducer";
import historyReducer from "./historyReducer";
import productPageReducer from "./productPageReducer";
import basketPageReducer from "./basketPageReducer";
import {combineReducers} from 'redux';


export const reducers=combineReducers({
    productReducer,
    userReducer,
    basketReducer,
    historyReducer,
    productPageReducer,
    basketPageReducer,
})