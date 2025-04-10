import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import darkLogo from "@/assets/image/utility_package_logo_B.png";
import lightLogo from "@/assets/image/utility_package_logo_W.png";

interface Card {
    name: string;
    description: string;
    image: string;
    path: string;
}

interface MainPageProps {
    isDarkMode: boolean;
}

const cards: Card[] = [
    {
        name: "이미지 업스케일링",
        description: "저해상도 이미지를 AI 업스케일링 기술을 활용하여 고해상도로 선명하게 변환합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/image-upscale",
    },
    {
        name: "이미지 변환 및 리사이즈",
        description: "이미지의 확장자를 변경하거나 크기를 조절합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/image-convert-resize",
    },
    {
        name: "동영상 업스케일링",
        description: "저화질 영상을 AI 업스케일링 기술을 활용하여 고해상도로 향상시킵니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/video-upscale",
    },
    {
        name: "동영상 변환 및 리사이즈",
        description: "영상의 포맷을 변환하거나 해상도를 조절합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/video-convert-resize",
    },
    {
        name: "영상 → 이미지 변환",
        description: "동영상을 프레임 단위 이미지로 추출합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/video-to-image",
    },
    {
        name: "이미지 → 영상 변환",
        description: "여러 이미지를 이어붙여 동영상을 생성합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/image-to-video",
    },
    {
        name: "JSON 포매터",
        description: "지저분한 JSON을 보기 좋게 정렬하고 포맷팅합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/json-formatter",
    },
    {
        name: "텍스트 유틸리티",
        description: "대소문자 전환, 공백 제거, 텍스트 일괄 변경, 글자 수 세기 등 텍스트 관련 기능을 제공합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/text-utils",
    },
    {
        name: "텍스트 인코딩/디코딩",
        description: "URL, Base64 등 다양한 텍스트 인코딩과 디코딩을 지원합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/text-encode-decode",
    },
    {
        name: "랜덤 키 생성기",
        description: "안전한 무작위 문자열이나 토큰을 생성합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/random-key-generator",
    },
    {
        name: "텍스트 비교",
        description: "두 개의 텍스트를 비교하여 차이점을 시각적으로 확인합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/text-diff",
    },
    {
        name: "QR 코드 생성기",
        description: "텍스트나 URL을 입력하면 QR 코드를 실시간으로 생성합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/qr-generator",
    },
    {
        name: "타임스탬프 변환기",
        description: "유닉스 타임스탬프와 날짜/시간을 상호 변환합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/timestamp-converter",
    },
    {
        name: "컬러 코드 변환기",
        description: "HEX, RGB, HSL 컬러 코드를 서로 변환하고 색상 미리보기를 제공합니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/color-converter",
    },
    {
        name: "엑셀 편집기",
        description: "엑셀(.xlsx) 파일을 업로드하여 내용을 열람하고 편집할 수 있습니다.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        path: "/excel-editor",
    },
];

const MainPage = ({ isDarkMode }: MainPageProps) => {
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
        <div className="w-full min-h-screen bg-white text-zinc-900 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 dark:text-white flex flex-col items-center px-4 pt-20 overflow-x-hidden transition-colors duration-300 relative">
            {/* 로고 이미지 */}
            <img
                src={isDarkMode ? lightLogo : darkLogo}
                alt="Utility Package"
                className="w-48 h-auto mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            />

            {/* 검색창 */}
            <input
                type="text"
                placeholder="🔍 유틸리티 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-12 px-5 py-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white text-base w-full max-w-md border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner transition-colors duration-300"
            />

            {/* 카드 목록 */}
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
                            className="w-[220px] min-h-[260px] bg-zinc-100 dark:bg-white/10 backdrop-blur-2xl rounded-2xl border border-zinc-200 dark:border-white/20 shadow-md dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-2xl p-4 flex flex-col"
                        >
                            {/* 이미지 + 제목 */}
                            <div className={`${isHovered ? "flex flex-row items-start gap-4" : "flex flex-col items-center"}`}>
                                <img
                                    src={card.image}
                                    alt={card.name}
                                    className={`object-contain transition-all duration-300 ${
                                        isHovered ? "w-12 h-12" : "w-5/6 h-2/3"
                                    }`}
                                />
                                <div className={`font-semibold break-keep ${isHovered ? "text-left mt-1" : "text-center mt-4"}`}>
                                    {card.name}
                                </div>
                            </div>

                            {/* 설명 */}
                            {isHovered && (
                                <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-pre-line text-left break-keep">
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
