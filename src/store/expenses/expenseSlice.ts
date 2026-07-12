import { createSlice, PayloadAction } from '@reduxjs/toolkit';




export interface expenseData {
    expense_id  :string;
    amount : number;
    expense_date: string;

    category_id : string;
    category_name : string;
    category_icon? : string;

    expense_note?: string;
}

interface expenseSlice {
    budget: string;
    peroid: string;
    recentExpenses : expenseData[];
}

const initialState : expenseSlice = {
    budget : "",
    peroid: "",
    recentExpenses : [],
}

const userSlice  = createSlice({
    name : "user",
    initialState,
    reducers : {

        setBudgetData : (state, action) => {
            Object.assign(state,action.payload)
        },

        setRecentExpenses : (state, action) =>{
            state.recentExpenses = action.payload
        }
        
        
    }
});


export const {setBudgetData, setRecentExpenses} = userSlice.actions;
export default userSlice.reducer;

