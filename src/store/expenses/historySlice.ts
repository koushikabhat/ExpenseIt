import { createSlice } from "@reduxjs/toolkit";
import { expenseData } from "./expenseSlice";


interface HistoryState {
    items: expenseData[];


    page: number;
    totalPages: number;

    hasMore: boolean;

    loading: boolean;
    refreshing: boolean;

    loadingMore: boolean;

    error: string | null;
    isStale: boolean; 
  }
  

const initialState : HistoryState  = {
  items : [],

  page: 1,
  totalPages: 1,
  hasMore: true,

  loading: false,
  refreshing: false,

  loadingMore: false,
  error: null,
  isStale: true, 
}
export const HistorySlice = createSlice({
    name : "history",
    initialState : initialState,
    reducers : {

        setLoading : (state, action) => {
            state.loading = action.payload;
            state.error = null;
        },

        setRefreshing : (state, action) =>{
            state.refreshing = action.payload;
            state.error = null
        },

        setLoadingMore(state) {
            state.loadingMore = true;
            state.error = null;
        },
        
        
        setExpense : ( state, action) => {
            const { expenses, page, totalPages, hasMore, append } = action.payload;

            state.items = append ? [...state.items , ...expenses] : expenses,

            state.page = page;
            state.totalPages = totalPages;
            state.hasMore = hasMore;

            state.loading = false;
            state.refreshing = false;
            state.loadingMore = false;
            state.isStale = true;

            state.error = null;
        },


        fetchFailed: (state, action) => {
            state.loading = false;
            state.refreshing = false;
            state.loadingMore = false;

            state.isStale = true;
            state.error = action.payload;
        },

        markStale: (state) => { state.isStale = true; }, 

        resetState  :  () => initialState

    }
})


export  const {setLoading, setLoadingMore, setRefreshing, setExpense, fetchFailed, markStale, resetState } = HistorySlice.actions;

export default HistorySlice.reducer;
