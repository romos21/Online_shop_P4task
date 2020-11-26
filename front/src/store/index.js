import {createStore} from "redux";
import {reducers} from '../reducers';

console.log(reducers);

export const store=createStore(reducers);