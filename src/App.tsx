import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "./view/Pages/Login/Login.tsx";
import * as React from "react";
import {useEffect, useState} from "react";
import {isTokenExpired} from "./auth/auth.ts";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";

function App() {

    const navigate = useNavigate();
    const [isRedirected, setIsRedirected] = useState(false);

    useEffect(() => {
        if (!isRedirected) {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");
            if (!token || isTokenExpired(token)) {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken")
                navigate("/login")
            } else {
                if (role === "admin") {
                    navigate("/admin-dashboard");
                } else if (role === "customer") {
                    navigate("/customer-dashboard");
                } else {
                    // Default to customer-dashboard if no role is found
                    navigate("/customer-dashboard");
                }
            }
            setIsRedirected(true);
        }
    }, [navigate, isRedirected]);

    return (

        <Routes>
            <Route path="/*" element={<DefaultLayout/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>

    );
}

export default App;