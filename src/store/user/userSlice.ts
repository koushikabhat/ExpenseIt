import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
    email: string;
    name: string;
}
  

const initialState : UserState = {
    email : "",
    name: "",
}

const userSlice  = createSlice({
    name : "user",
    initialState,
    reducers : {

        setEmail : (state, action) => {
            state.email = action.payload
        },

        setLogin : (state, action) => {
            Object.assign(state, action.payload);
        },

        setUser : (state, action : PayloadAction<UserState>) => {
            state.name = action.payload.name,
            state.email = action.payload.email
        },
        
        
        clearUser : (state, action ) => {
            state.email  = "",
            state.name = ""
        }   
        
    }
});


export const {setUser , setEmail , setLogin, clearUser} = userSlice.actions;
export default userSlice.reducer;

