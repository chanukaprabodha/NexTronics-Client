import {Route, Routes, useNavigate} from "react-router-dom";
import {CustomerDashboard} from "../../pages/Dashboards/CustomerDashboard.tsx";
import {Login} from "../../pages/Login/Login.tsx";
import {AdminDashboard} from "../../pages/Dashboards/AdminDashboard.tsx";
import {ProductDetails} from "../Product/ProductDetails.tsx";
import {ManageProducts} from "../../pages/ManageProducts.tsx";

type MainContentProps = {
    role: string;
}

export function MainContent({role}: MainContentProps) {

    const Navigate = useNavigate();

    let routes;

    if (role === "customer") {
        routes = (
            <>
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </>
        );
    } else if (role === "admin") {
        routes = (
            <>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/manage-products" element={<ManageProducts />} ></Route>
            </>
        );
    } else {
        routes = (
            <>
                <Route path="/login" element={<Login />} />
            </>
        );
    }

    console.log("Role in MainContent:", role);
    console.log("Routes in MainContent:", routes);
    return (
        <div className="flex flex-col flex-grow w-full h-full p-4 bg-gray-100">
            <Routes>
                {routes}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default MainContent;