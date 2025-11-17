import { configureStore } from "@reduxjs/toolkit";
import enderecoReducer from "./enderecoSlice";
import authReducer from "./authSlice";

export default configureStore({
    reducer: {
        endereco: enderecoReducer,
        auth: authReducer
    }
});