import apiClient from "../apiClient";
import { apiUrls } from "../apiUrls";

export const fetchHistory = async(page : number ) => {
    try{
        const params   =  {
            page  : page,
        }
        const resposne = await apiClient.get(apiUrls.getExpenses, { params})
        return resposne;
    }
    catch(error : any){
        throw error;
    }
}