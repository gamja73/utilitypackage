import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Card {
    name: string;
    image: string;
    path: string;
}

const cards: Card[] = [
    { name: "JSON 포매터", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "" },
    { name: "텍스트 수 세기", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "" },
    { name: "이미지 업스케일링", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "" },
    { name: "영상 업스케일링", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "" },
    { name: "PDF 합치기", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "" },
    { name: "PDF 나누기", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "" },
];

const MainPage = () => {
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
        <div className="w-full min-h-screen bg-zinc-900 text-white flex flex-col items-center px-4 pt-20 overflow-x-hidden">
            <h1 className="text-4xl font-bold mb-6 text-center">Utility package</h1>
            <input
                type="text"
                placeholder="유틸리티 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-8 px-4 py-2 rounded-md bg-zinc-800 tex    t-white w-full max-w-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div
                ref={containerRef}
                className="w-full max-w-screen-xl px-6 md:px-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 place-items-center"
            >
                {filteredCards.map((card, index) => {
                    const isHovered = hoverIndex === index;
                    const isFocused = focusedIndex === index;
                    const scale = isFocused ? 1.5 : isHovered ? 1.1 : 1;
                    const zIndex: number | "auto" = isFocused ? 50 : "auto";

                    return (
                        <div
                            key={index}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            onClick={() => setFocusedIndex(index)}
                            style={{
                                transform: `scale(${scale})`,
                                zIndex,
                            }}
                            className="w-[180px] h-[240px] bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl overflow-hidden cursor-pointer transition-transform duration-300 relative"
                        >
                            <img src={card.image} alt={card.name} className="w-5/6 h-2/3 object-contain m-auto" />
                            <div className="h-1/3 flex items-center justify-center text-white font-semibold text-center px-2">
                                {card.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainPage;