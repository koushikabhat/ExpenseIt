import { createSlice } from '@reduxjs/toolkit';




export interface categoryData {
    category_id : string;
    name : string;
    description : string;
    is_default : boolean;
    icon : string;
}

interface categorySlice {
    customCategories : categoryData[];
    categories : categoryData[];
}

const initialState : categorySlice = {
    customCategories : [],
    categories  : [],
    
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
        }
        
        
    }
});


export const {setCustomCategory, setCategories} = categoryslice.actions;
export default categoryslice.reducer;

