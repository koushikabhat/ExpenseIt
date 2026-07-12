import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./user/userSlice";
import authReducer from "./auth/authSlice"
import expenseReducer from "./expenses/expenseSlice"

export const store = configureStore({
    reducer : {
        auth : authReducer,
        user : userReducer,
        expense : expenseReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;