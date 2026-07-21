import { ThemeContext } from "@react-navigation/native";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SemiBoldText } from "../utils/Texts";

interface ToastContextValue {
    SuccessToast: (message: string) => void;
    FailureToast: (message: string) => void;
    WarningToast: (message: string) => void;
}

  
const ToastContext = createContext<ToastContextValue| null>(null);
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");


export const ToastProvider = ({children}: { children: React.ReactNode}) => {

    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    
    const animateAndShow = (type: string, message: string) => {
        setToast({ type, message });
    };

    const SuccessToast = (message: string) => animateAndShow("success", message);
    const FailureToast = (message: string) => animateAndShow("failure", message);
    const WarningToast = (message: string) => animateAndShow("warning", message);


    useEffect(() => {
        if (!toast) return;

        Animated.parallel([
        Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT / 2 - 40,
            duration: 300,
            useNativeDriver: true,
        }),
        Animated.timing(opacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }),
        ]).start();

        const timer = setTimeout(() => {
        Animated.parallel([
            Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 250,
            useNativeDriver: true,
            }),
            Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            }),
        ]).start(() => setToast(null));
        }, 2000);

        return () => clearTimeout(timer);
    }, [toast]);

    const CONFIG: Record<string, { bg: string; icon: string }> = {
        success: { bg: "#22C55E", icon: "checkmark-circle" },
        failure: { bg: "#EF4444", icon: "close-circle" },
        warning: { bg: "#F59E0B", icon: "warning" },
    };

    return(
        <ToastContext.Provider value={{SuccessToast, FailureToast, WarningToast}}>
            {children}
            {toast && (
                <Animated.View
                pointerEvents="none"
                style={[
                    styles.toast,
                    { backgroundColor: CONFIG[toast.type].bg, opacity, transform: [{ translateY }] },
                ]}
                >
                <Ionicons name={CONFIG[toast.type].icon} size={20} color="#fff" />
                <SemiBoldText style={styles.text}>{toast.message}</SemiBoldText>
                </Animated.View>
            )}
        </ToastContext.Provider>
    )
}

const styles = StyleSheet.create({
    toast: {
      position: "absolute",
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      maxWidth: "90%",
      paddingHorizontal: 18,
      paddingVertical: 14,
      borderRadius: 16,
    },
    text: {
      color: "#fff",
      fontSize: 14,
      flexShrink: 1,
    },
  });
  

export const useToast = () => {
   const Toast =  useContext(ToastContext) 
   if(!Toast){
    throw new Error( 'useToast  must be used within ToastProvider');
   }

   return Toast;
}