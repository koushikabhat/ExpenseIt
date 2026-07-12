import apiClient from "../apiClient";
import { apiUrls } from "../apiUrls";

export const login = async(email : string, password: string) => {
   try{
    console.log("the email and the password is ", email, password);
    if(!email || !password) return;

    const payload = {
        email : email,
        password : password
    }

    console.log("base url is",apiClient.defaults.baseURL + apiUrls.login)
    const resposne = await apiClient.post(apiUrls.login, payload);
    console.log("resposnse is ",resposne)
    return resposne;
   }
   catch(error : any){
    console.log("error is", error?.response?.data ?? error?.message);
    throw error;
   }
}