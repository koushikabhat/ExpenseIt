import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
    access_token: string;
    access_expires_in: Number;
    refresh_token: string;
    refresh_expires_in : Number

    isAuthenticated: boolean;
    isInitializing: boolean;
}  

const initialState : authState = {
    refresh_token: "",
    access_token : "",
    access_expires_in : 0,
    refresh_expires_in: 0,

    isAuthenticated: false,
    isInitializing: true,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {

        setCredentials : (state, action : PayloadAction <any >) => {
            state.access_token =  action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.access_expires_in = action.payload.access_expires_in;
            state.refresh_expires_in = action.payload.refresh_expires_in;
            state.isAuthenticated = action.payload.isAuthenticated;
        },

        finishInitialization: (state) => {
            state.isInitializing = false;
        },
      

        
        clearCredentials  : (state) => {
            state.access_token = "";
            state.refresh_token  = "";
            state.access_expires_in = 0;
            state.refresh_expires_in = 0;

            state.isAuthenticated = false;
            state.isInitializing = false;
        }   
        
    }
})



export const {setCredentials , clearCredentials, finishInitialization} = authSlice.actions;
export default authSlice.reducer;
