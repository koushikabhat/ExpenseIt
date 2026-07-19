import { createSlice } from '@reduxjs/toolkit';

export interface categoryData {
    category_id : string;
    name : string;
    description : string;
    is_default : boolean;
    icon : string;
}

export interface categoryWiseAmount {
    category_id : string;
    category_name : string;
    category_icon : string;
    total_spent : any;
}


interface categorySlice {
    customCategories : categoryData[];
    categories : categoryData[];

    categoryWiseAmount : categoryWiseAmount[];
}

const initialState : categorySlice = {
    customCategories : [],
    categories  : [],
    categoryWiseAmount : [],
}

const categoryslice  = createSlice({
    name : "category",
    initialState,
    reducers : {

        setCustomCategory : (state, action) => {
            state.customCategories = action.payload
        },

        setCategories : (state, action) =>{
            state.categories = action.payload
        },

        setCategoryWiseAmount : (state, action) => {
            state.categoryWiseAmount = action.payload;
        }
        
        
    }
});


export const {setCustomCategory, setCategories, setCategoryWiseAmount} = categoryslice.actions;
export default categoryslice.reducer;

