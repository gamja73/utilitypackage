import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Card {
    name: string;
    image: string;
    path: string;
}

const cards: Card[] = [
    { name: "JSON 포매터", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/json-formatter" },
    { name: "텍스트 수 세기", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/text-counter" },
    { name: "이미지 업스케일링", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/image-upscale" },
    { name: "영상 업스케일링", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/video-upscale" },
    { name: "PDF 합치기", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/merge-pdf" },
    { name: "PDF 나누기", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/split-pdf" },
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
        <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex flex-col items-center px-4 pt-20 overflow-x-hidden relative">
            <h1 className="text-5xl font-extrabold mb-10 text-center tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                Utility Package
            </h1>

            <input
                type="text"
                placeholder="🔍 유틸리티 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-12 px-5 py-3 rounded-full bg-zinc-800 text-white text-base w-full max-w-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner"
            />

            <div
                ref={containerRef}
                className="w-full max-w-screen-xl px-6 md:px-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-8 place-items-center"
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
                            onClick={() => {
                                setFocusedIndex(index);
                                setTimeout(() => navigate(card.path), 300); // 클릭 시 확대 후 이동
                            }}
                            style={{
                                transform: `scale(${scale})`,
                                zIndex,
                            }}
                            className="w-[180px] h-[240px] bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out relative hover:shadow-2xl"
                        >
                            <img
                                src={card.image}
                                alt={card.name}
                                className="w-5/6 h-2/3 object-contain m-auto mt-4"
                            />
                            <div className="h-1/3 flex items-center justify-center text-white font-semibold text-center px-2">
                                {card.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPage;
