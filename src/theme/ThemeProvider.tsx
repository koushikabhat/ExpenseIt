import React, {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import { AppTheme, darkTheme, lightTheme } from './constant';


const ThemeContext = createContext<{theme : AppTheme} | null >(null);


export const ThemeProvider = ({children}: { children: React.ReactNode}) => {
    const colorScheme = useColorScheme();

    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;  
    const toggleTheme = () =>{
        !!theme
    }

    return(
        <ThemeContext.Provider value={{theme} }>
            {children}
        </ThemeContext.Provider>
    );
}


export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error( 'useTheme must be used within ThemeProvider');
    }
    
    return context;
}