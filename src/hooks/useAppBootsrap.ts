import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { storage } from "../storage/mmkv";
import { clearCredentials, setCredentials } from "../store/auth/authSlice";


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


            }catch(error : any){
                dispatch(clearCredentials());
            }
        })();



    }, [dispatch]);
    
}