import {Navbar} from "../Navbar/Navbar.tsx";
import {Footer} from "../Footer/Footer.tsx";
import Sidebar from "../../component/Sidebar.tsx";
import * as React from "react";
import {useState} from "react";
import {MainContent} from "../MainContent/MainContent.tsx";

export function DefaultLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const role = localStorage.getItem("role") || "guest";

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} role={role}/>

            {/* Main Content Area */}
            <div className="flex flex-col flex-grow">
                {/* Horizontal Navbar */}
                <Navbar onToggleSidebar={toggleSidebar} role={role}/>

                {/* Main Content */}
                <main className="flex-grow overflow-y-auto bg-gray-50">
                    <MainContent role={role}/>
                    <Footer/>
                </main>

                {/* Footer */}

            </div>
        </div>
    );
}