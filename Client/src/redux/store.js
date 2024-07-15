import {configureStore}  from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import {apiSlice} from "./slices/apiSlice"


 const store= configureStore({
    reducer:{

        [apiSlice.reducerPath]: apiSlice.reducer,  //A dynamic reducer path and middleware setup for handling API requests (apiSlice.reducer and apiSlice.middleware).
        auth: authReducer                              
    },
    middleware: (getDefaultMiddleware)=> 
        getDefaultMiddleware().concat(apiSlice.middleware),           
        devTools: true,
})


export default store;