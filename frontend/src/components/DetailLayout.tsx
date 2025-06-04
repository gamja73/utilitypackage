import React from "react";
import DarkModeToggle from "@/components/DarkModeToggle";

interface DetailLayoutProps {
    title: string;
    icon: string;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    children: React.ReactNode;
}

const DetailLayout = ({ title, icon, isDarkMode, toggleDarkMode, children }: DetailLayoutProps) => {
    return (
        <div className="min-h-screen w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white transition-colors duration-300">
            <header className="relative flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
                <img src="https://cdn.utilitypackage.it.kr/newIcon/utilityPackageLogo.avif" alt="Logo" className={`h-10 w-auto cursor-pointer ${isDarkMode ? "invert" : ""}`} onClick={() => window.location.href = "/"}/>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                    <img src={icon} alt="Page Icon" className={`h-8 w-8 mr-4 hidden md:block ${isDarkMode ? "invert" : ""}`}  onError={(e) => (e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png')}/>
                    <h1 className="text-xl md:text-xl font-semibold text-center break-words text-balance max-w-lg">{title}</h1>
                </div>
                <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
            </header>
            <main className="p-6">{children}</main>
        </div>
    );
};

export default DetailLayout;
