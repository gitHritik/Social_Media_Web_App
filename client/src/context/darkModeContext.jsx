/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") || "light";
    });

    useEffect(() => {
        if (darkMode === "dark") {
            document.documentElement.classList.add("dark");  
        } else {
            document.documentElement.classList.remove("dark"); 
        }
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </DarkModeContext.Provider>
    );
};
