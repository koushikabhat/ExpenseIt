import apiClient from "../apiClient";
import { apiUrls } from "../apiUrls";

export const getOverviewData = async() => {
   try{
    
    const resposne = await apiClient.get(apiUrls.getOverview);
    return resposne;
   }
   catch(error : any){
    console.log("error is", error?.response?.data ?? error?.message);
    throw error;
   }
}