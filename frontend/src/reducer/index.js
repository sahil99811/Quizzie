import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import popupReducer from '../slices/popupSlice' 
const rootReducer  = combineReducers({
    auth: authReducer,
    popup:popupReducer
})

export default rootReducer