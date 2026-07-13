import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { storage } from "../storage/mmkv";
import { clearCredentials, setCredentials } from "../store/auth/authSlice";
import { getAllCategories } from "../api/services/categoryService";
import { setCategories } from "../store/category/categorySlice";


export const useAppBootstrap = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      
        (async() => {
            try{
                const access_token = storage.getString("access_token");
                const refresh_token = storage.getString("refresh_token");

                if(!access_token || !refresh_token){
                    dispatch(clearCredentials());
                    return;
                }

                // TODO : REfresh token call and set the tokens 
                // dispatch(setCredentials({
                    
                // }))

                getAllCategories()
                .then((res) => {
                    if(res.data.success){
                        dispatch(setCategories(res.data.data.categories))
                    }
                })
                .catch((err : any) => console.log("category fetch failed", err?.response?.data))

            }catch(error : any){
                dispatch(clearCredentials());
            }
        })();



    }, [dispatch]);
    
}