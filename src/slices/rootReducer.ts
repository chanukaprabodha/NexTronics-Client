import {combineReducers} from "redux";
import productReducer from "./productSlice.ts";
import cartReducer from "./cartSlice.ts";
import contactReducer from './contactSlice.ts';
import userReducer from "./UserSlice.ts";
import orderReducer from "./orderSlice.ts";
export const rootReducer = combineReducers({
    cart: cartReducer,
    contact: contactReducer,
    product: productReducer,
    user: userReducer,
    order: orderReducer

});

export type RootReducerState = ReturnType<typeof rootReducer>