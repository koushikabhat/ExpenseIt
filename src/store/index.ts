import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user/userSlice";
import authReducer from "./auth/authSlice"
import expenseReducer from "./expenses/expenseSlice"
import categoryReducer from "./category/categorySlice"

export const store = configureStore({
    reducer : {
        auth : authReducer,
        user : userReducer,
        expense : expenseReducer,
        category: categoryReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;