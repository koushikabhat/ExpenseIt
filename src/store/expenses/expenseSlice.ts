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


export interface OverviewCategoryData {
    total_spent: number;
    category_id: string;
    category_name: string;
    percentage: number;
}


export type Period = "weekly"| "monthly" | "yearly"  | ""
interface expenseSlice {
    budget: string;
    peroid: Period;
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


    overviewExpenseData : OverviewCategoryData [];
}

const initialState : expenseSlice = {
    budget : "",
    peroid: "",
    total_spent : 0,
    recentExpenses : [],

    categoryExpenses: [],
    categoryExpensePagination: null,


    // for overview screen 
    
    overviewExpenseData  : [],

    
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

        setOverviewData : (state, action) =>{
            state.overviewExpenseData = action.payload
        }
        
        
    }
});


export const {setBudgetData,setCategoryExpenses,  setRecentExpenses, setTotalSpent, setOverviewData} = expenseSlice.actions;
export default expenseSlice.reducer;

