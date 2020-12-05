import userReducer from "./userReducer";
import productReducer from "./productReducer";
import basketReducer from "./basketReducer";
import {combineReducers} from 'redux';


export const reducers=combineReducers({
    productReducer,
    userReducer,
    basketReducer,
})