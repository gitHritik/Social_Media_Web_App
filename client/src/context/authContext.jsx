/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        return JSON.parse(localStorage.getItem("currentUser")) || null;
    });

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    const login = async (inputs) => {
        try {
            const res = await axios.post("http://localhost:8800/auth/api/login", inputs, {
                withCredentials: true
            });
            setCurrentUser(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};
