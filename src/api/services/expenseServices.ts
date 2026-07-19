import apiClient from "../apiClient";
import { apiUrls } from "../apiUrls";

export const addExpense = async(
    categoryId : string, 
    amount : string , 
    expenseDate : string, 
    note: string,
    paymentMethod: string = "online"
) => {
   try{

    if(!categoryId || !amount || !expenseDate) return;
    const payload = {
        categoryId: categoryId,
        amount: Number(amount),
        expenseDate: expenseDate,
        paymentMethod: paymentMethod,
        note: note
    }
    console.log("amount is ",amount, "expenseDate is",expenseDate, "note is ",note)
    const resposne = await apiClient.post(apiUrls.addExpense, payload);
    return resposne;
   }
   catch(error : any){
    console.log("error is", error?.response?.data ?? error?.message);
    throw error;
   }
}


export const fetchExpenseForCategoryId = async(category_id : string) => {
    if(!category_id) return;

    try{
        const response = await apiClient.get(`${apiUrls.getExpenses}/category/${category_id}`)
        return response;

    }catch(error : any){
        throw error;
    }   
}