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
    total_spent : number;
    recentExpenses : expenseData[];
}

const initialState : expenseSlice = {
    budget : "",
    peroid: "",
    total_spent : 0,
    recentExpenses : [],
}

const expenseSlice  = createSlice({
    name : "expense",
    initialState,
    reducers : {

        setBudgetData : (state, action) => {
            Object.assign(state,action.payload)
        },

        setRecentExpenses : (state, action) =>{
            state.recentExpenses = action.payload
        },

        setTotalSpent : (state, action) =>{
            state.total_spent = action.payload
        }
        
        
    }
});


export const {setBudgetData, setRecentExpenses, setTotalSpent} = expenseSlice.actions;
export default expenseSlice.reducer;

