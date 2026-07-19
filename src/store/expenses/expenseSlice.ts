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


export interface categoryExpenseData {
    expense_id: string;
    amount: number;
    note?: string;
    created_at: string;
}


interface expenseSlice {
    budget: string;
    peroid: string;
    total_spent : number;
    recentExpenses : expenseData[];

    categoryExpenses : categoryExpenseData[];

    categoryExpensePagination: {
        page: number;
        limit: number;
        total_items: number;
        total_pages: number;
        has_more: boolean;
    } | null;
}

const initialState : expenseSlice = {
    budget : "",
    peroid: "",
    total_spent : 0,
    recentExpenses : [],

    categoryExpenses: [],
    categoryExpensePagination: null,

    
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
        },

        setCategoryExpenses: (state, action) => {
            state.categoryExpenses = action.payload.data;
            state.categoryExpensePagination = action.payload.meta;
        },
        
        
    }
});


export const {setBudgetData,setCategoryExpenses,  setRecentExpenses, setTotalSpent} = expenseSlice.actions;
export default expenseSlice.reducer;

