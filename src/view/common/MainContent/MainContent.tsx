import { Route, Routes, Navigate } from "react-router-dom";
import { CustomerDashboard } from "../../pages/Dashboards/CustomerDashboard.tsx";
import { Login } from "../../pages/Login/Login.tsx";
import { AdminDashboard } from "../../pages/Dashboards/AdminDashboard.tsx";
import { ProductDetails } from "../Product/ProductDetails.tsx";
import { ManageProducts } from "../../pages/ManageProducts/ManageProducts.tsx";
import { ShoppingCart } from "../../pages/Shopping Cart/ShoppingCart.tsx";
import Checkout from "../../pages/Checkout/Checkout.tsx";

type MainContentProps = {
    role: string;
};

export function MainContent({ role }: MainContentProps) {
    let routes;

    if (role === "customer") {
        routes = (
            <>
                <Route path="/" element={<Navigate to="/customer-dashboard" />} />
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/checkout" element={<Checkout />} />
            </>
        );
    } else if (role === "admin") {
        routes = (
            <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/manage-products" element={<ManageProducts />} />
            </>
        );
    } else {
        // Unknown role or not logged in
        routes = (
            <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
            </>
        );
    }

    return (
        <div className="flex flex-col flex-grow w-full h-full p-4 bg-gray-100">
            <Routes>
                {routes}
                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default MainContent;
