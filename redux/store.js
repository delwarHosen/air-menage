import { configureStore } from "@reduxjs/toolkit";
import baseApis from "./baseApi";
import roleReducer from './roleSlice';


const store = configureStore({
    reducer: {
        role: roleReducer,
        [baseApis.reducerPath]: baseApis.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(baseApis.middleware)
})

export default store
