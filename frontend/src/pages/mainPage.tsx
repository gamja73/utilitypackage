import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Card {
    name: string;
    description: string;
    image: string;
    path: string;
}

const cards: Card[] = [
    {
        name: "이미지 업스케일링",
        description: "저해상도 이미지를 선명하게 변환합니다.\nAI 기반 업스케일링을 지원합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/image-upscale",
    },
    {
        name: "PDF 합치기",
        description: "여러 PDF 파일을 하나로 합칩니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/merge-pdf",
    },
    // ...더 추가
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
        <div className="w-full min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex flex-col items-center px-4 pt-20 overflow-x-hidden">
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
                            style={{
                                transform: `scale(${scale})`,
                                zIndex,
                            }}
                            className="w-[220px] min-h-[260px] bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl p-4 flex flex-col"
                        >
                            {/* 상단 영역: 이미지 + 제목 */}
                            <div
                                className={`transition-all duration-300 ${
                                    isHovered ? "flex flex-row items-start gap-4" : "flex flex-col items-center"
                                }`}
                            >
                                <img
                                    src={card.image}
                                    alt={card.name}
                                    className={`transition-all duration-300 object-contain ${
                                        isHovered ? "w-12 h-12" : "w-5/6 h-2/3"
                                    }`}
                                />
                                <div
                                    className={`text-white font-semibold transition-all duration-300 ${
                                        isHovered ? "text-left mt-1" : "text-center mt-4"
                                    }`}
                                >
                                    {card.name}
                                </div>
                            </div>

                            {/* 설명: hover시에만 이미지 아래 왼쪽 정렬로 표시 */}
                            {isHovered && (
                                <div className="mt-4 text-sm text-zinc-300 whitespace-pre-line text-left transition-all duration-300">
                                    {card.description}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPage;
