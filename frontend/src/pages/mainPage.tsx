import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "@/components/DarkModeToggle";
import darkLogo from "@/assets/image/utility_package_logo_B.png";
import lightLogo from "@/assets/image/utility_package_logo_W.png";

interface Card {
    name: string;
    description: string;
    image_B: string;
    image_W: string;
    path: string;
}

interface MainPageProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    cards: Card[];
}

const MainPage = ({ isDarkMode, toggleDarkMode, cards }: MainPageProps) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [search, setSearch] = useState<string>("");


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setFocusedIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCards = cards.filter((card) =>
        card.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full min-h-screen bg-white text-zinc-900 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 dark:text-white flex flex-col items-center px-4 pt-5 pb-7 overflow-x-hidden transition-colors duration-300 relative">
            <div className="w-full max-w-screen-xl flex justify-end px-4 sm:px-6 md:px-8 mb-6">
                <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
            </div>
            <img src={isDarkMode ? lightLogo : darkLogo} alt="Utility Package" className="w-56 h-auto mt-10 mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"/>
            <div className="mb-12 w-full max-w-md px-5 py-3 flex items-center gap-3 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-inner transition-colors duration-300 focus-within:ring-2 focus-within:ring-teal-500">
                <span className="text-zinc-500 dark:text-zinc-400 text-lg">🔍</span>
                <input type="text" placeholder="유틸리티 검색..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500"/>
            </div>
            <div ref={containerRef} className="w-full max-w-screen-xl px-4 sm:px-6 md:px-12 pt-5 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-y-16 gap-x-4 place-items-center">
                {filteredCards.map((card, index) => {
                    const isHovered = hoverIndex === index;
                    const isFocused = focusedIndex === index;
                    const scale = isFocused ? 1.5 : 1;
                    const zIndex: number | "auto" = isFocused ? 50 : "auto";

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            onClick={() => {
                                setFocusedIndex(index);
                                setTimeout(() => navigate(card.path), 300);
                            }}
                            style={{transform: `scale(${scale})`, zIndex}}
                            className="w-[200px] min-h-[260px] bg-zinc-100 dark:bg-white/10 backdrop-blur-2xl rounded-2xl border border-zinc-200 dark:border-white/20 shadow-md dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-2xl p-4 flex flex-col"
                        >
                            <div className={`${isHovered ? "flex flex-row items-start gap-4" : "flex flex-col items-center"}`}>
                                <img src={isDarkMode ? card.image_W : card.image_B} alt={card.name} className={`object-contain transition-all duration-300 ${isHovered ? "w-12 h-12" : "w-5/6 h-2/3"}`}/>
                                <div className={`font-semibold break-keep ${isHovered ? "text-left mt-1" : "text-center mt-4"}`}>{card.name}</div>
                            </div>
                            {isHovered && (<div className="mt-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-pre-line text-left break-keep">{card.description}</div>)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPage;
