import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
import { productByIdReducer } from "./slices/productByIdSlice";
import { productPaginationReducer } from "./slices/productPaginationSlice";
import { categoryReducer } from "./slices/categorySlice";
import { securityReducer } from "./slices/securitySlice";


export default configureStore({
    reducer:{
        products:productReducer,
        product:productByIdReducer,
        productPagination:productPaginationReducer,
        category:categoryReducer,
        security:securityReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
});