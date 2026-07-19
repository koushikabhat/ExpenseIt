import apiClient from "../apiClient";
import { apiUrls } from "../apiUrls";

export const getAllCategories = async() => {
   try{
    console.log("Getting all the categories \n");
    

    const resposne = await apiClient.get(apiUrls.getAllCategories);
    console.log("resposnse is ",resposne)
    return resposne;
   }
   catch(error : any){
    console.log("error is", error?.response?.data ?? error?.message);
    throw error;
   }
}


export const getCategoryWiseExpense = async() => {
   try{

      const response = await apiClient.get(apiUrls.getCategoryWiseAmount);
      return response;

   }catch(error  :any){
      console.log("Erro occured ", error);
      throw error;
   }
}