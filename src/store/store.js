import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import  authBrandSlice  from "../auth/authBrand";

export default configureStore({
    reducer: {
        auth: authSlice,
        authBrand: authBrandSlice,
    }
})