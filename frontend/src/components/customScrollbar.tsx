import React, { ReactNode } from "react";
import "./customScrollbar.css";

interface CustomScrollbarProps {
    children: ReactNode;
    className?: string;
}

const CustomScrollbar = ({ children, className = "" }: CustomScrollbarProps) => {
    return (
        <div className={`custom-scrollbar overflow-auto bg-zinc-900 text-white ${className}`}>
            {children}
        </div>
    );
}

export default CustomScrollbar;
