import {jwtDecode} from 'jwt-decode';
import type {UserData} from "../modal/UserData.ts";

export const isTokenExpired = (token: string) => {
    try {
        const {exp} = jwtDecode(token);
        if (!exp) {
            return true
        }
        return Date.now() >= exp * 1000
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // If there's an error, we assume the token is expired
    }
}

export const getUserFromToken = (token: string) => {
    return jwtDecode<UserData>(token);
}