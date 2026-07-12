import apiClient from "../apiClient";
import { apiUrls } from "../apiUrls";

export const fetchDashboardData = async() => {
   try{
    const resposne = await apiClient.get(apiUrls.getDashboardData);
    console.log("resposnse is ",resposne)
    return resposne;
   }
   catch(error : any){
    console.log("error is", error?.response?.data ?? error?.message);
    throw error;
   }
}