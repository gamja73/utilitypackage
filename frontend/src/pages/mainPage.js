import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "@/components/DarkModeToggle";
import darkLogo from "@/assets/image/utility_package_logo_B.png";
import lightLogo from "@/assets/image/utility_package_logo_W.png";
const cards = [
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
const MainPage = ({ isDarkMode, toggleDarkMode }) => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!containerRef.current?.contains(e.target)) {
                setFocusedIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const filteredCards = cards.filter((card) => card.name.toLowerCase().includes(search.toLowerCase()));
    return (_jsxs("div", { className: "w-full min-h-screen bg-white text-zinc-900 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 dark:text-white flex flex-col items-center px-4 pt-5 pb-7 overflow-x-hidden transition-colors duration-300 relative", children: [_jsx("div", { className: "w-full max-w-screen-xl flex justify-end px-4 sm:px-6 md:px-8 mb-6", children: _jsx(DarkModeToggle, { isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode }) }), _jsx("img", { src: isDarkMode ? lightLogo : darkLogo, alt: "Utility Package", className: "w-56 h-auto mt-10 mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" }), _jsxs("div", { className: "mb-12 w-full max-w-md px-5 py-3 flex items-center gap-3 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-inner transition-colors duration-300 focus-within:ring-2 focus-within:ring-teal-500", children: [_jsx("span", { className: "text-zinc-500 dark:text-zinc-400 text-lg", children: "\uD83D\uDD0D" }), _jsx("input", { type: "text", placeholder: "\uC720\uD2F8\uB9AC\uD2F0 \uAC80\uC0C9...", value: search, onChange: (e) => setSearch(e.target.value), className: "flex-1 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500" })] }), _jsx("div", { ref: containerRef, className: "w-full max-w-screen-xl px-4 sm:px-6 md:px-12 pt-5 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-y-16 gap-x-4 place-items-center", children: filteredCards.map((card, index) => {
                    const isHovered = hoverIndex === index;
                    const isFocused = focusedIndex === index;
                    const scale = isFocused ? 1.5 : 1;
                    const zIndex = isFocused ? 50 : "auto";
                    return (_jsxs("div", { onMouseEnter: () => setHoverIndex(index), onMouseLeave: () => setHoverIndex(null), onClick: () => {
                            setFocusedIndex(index);
                            setTimeout(() => navigate(card.path), 300);
                        }, style: { transform: `scale(${scale})`, zIndex }, className: "w-[200px] min-h-[260px] bg-zinc-100 dark:bg-white/10 backdrop-blur-2xl rounded-2xl border border-zinc-200 dark:border-white/20 shadow-md dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-2xl p-4 flex flex-col", children: [_jsxs("div", { className: `${isHovered ? "flex flex-row items-start gap-4" : "flex flex-col items-center"}`, children: [_jsx("img", { src: card.image, alt: card.name, className: `object-contain transition-all duration-300 ${isHovered ? "w-12 h-12" : "w-5/6 h-2/3"}` }), _jsx("div", { className: `font-semibold break-keep ${isHovered ? "text-left mt-1" : "text-center mt-4"}`, children: card.name })] }), isHovered && (_jsx("div", { className: "mt-4 text-sm text-zinc-500 dark:text-zinc-300 whitespace-pre-line text-left break-keep", children: card.description }))] }, index));
                }) })] }));
};
export default MainPage;
