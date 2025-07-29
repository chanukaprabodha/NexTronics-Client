import {Navbar} from "../Navbar/Navbar.tsx";
import {Footer} from "../Footer/Footer.tsx";
import Sidebar from "../../component/Sidebar.tsx";
import * as React from "react";
import {useState} from "react";
import {MainContent} from "../MainContent/MainContent.tsx";
import {CartProvider} from "../../../context/CartContext.tsx";
import {ShoppingCart} from "../../pages/Shopping Cart/ShoppingCart.tsx";

export function DefaultLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const role = localStorage.getItem("role") || "guest";

    return (
        <CartProvider>
            <div className="flex h-screen">
                <Sidebar isOpen={sidebarOpen} role={role}/>

                {/* Right Content: Navbar + Main + Footer */}
                <div className="flex flex-col flex-grow">
                    <Navbar onToggleSidebar={toggleSidebar} role={role}/>
                    <ShoppingCart/>

                    {/* MainContent + Footer Container */}
                    <div className="flex flex-col flex-grow overflow-y-auto bg-gray-50">
                        <main className="flex-grow">
                            <MainContent role={role}/>
                        </main>
                        <Footer/>
                    </div>
                </div>
            </div>
        </CartProvider>

    );
}