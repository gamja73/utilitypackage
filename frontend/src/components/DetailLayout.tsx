import React from "react";
import darkLogo from "@/assets/image/utility_package_logo_B.png";
import lightLogo from "@/assets/image/utility_package_logo_W.png";
import DarkModeToggle from "@/components/DarkModeToggle";

interface DetailLayoutProps {
    title: string;
    icon_B: string;
    icon_W: string;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    children: React.ReactNode;
}

const DetailLayout = ({ title, icon_B, icon_W, isDarkMode, toggleDarkMode, children }: DetailLayoutProps) => {
    return (
        <div className="min-h-screen w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white transition-colors duration-300">
            <header className="relative flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
                <img src={isDarkMode ? lightLogo : darkLogo} alt="Logo" className="h-10 w-auto cursor-pointer" onClick={() => window.location.href = "/"}/>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                    <img src={isDarkMode ? icon_W : icon_B} alt="Page Icon" className="h-8 w-8 mr-4 hidden md:block"/>
                    <h1 className="text-xl font-semibold">{title}</h1>
                </div>
                <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
            </header>
            <main className="p-6">{children}</main>
        </div>
    );
};

export default DetailLayout;
