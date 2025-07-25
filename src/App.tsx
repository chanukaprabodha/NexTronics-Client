import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "./view/Pages/Login/Login.tsx";
import * as React from "react";
import {useEffect} from "react";
import {isTokenExpired} from "./auth/auth.ts";
import {CustomerDashboard} from "./view/pages/Dashboards/CustomerDashboard.tsx";
import {ProductDetails} from "./view/common/Product/ProductDetails.tsx";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";

function App() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken")
            navigate("/login")
        }
    }, [navigate]);

    return (

        <Routes>
            <Route path="/*" element={<DefaultLayout/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>

    );
}

export default App;