import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const cards = [
    { name: "JSON 포매터", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/json-formatter" },
    { name: "텍스트 수 세기", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/text-counter" },
    { name: "이미지 업스케일링", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/image-upscale" },
    { name: "영상 업스케일링", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/video-upscale" },
    { name: "PDF 합치기", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/merge-pdf" },
    { name: "PDF 나누기", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png", path: "/split-pdf" },
];
const MainPage = () => {
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
    return (_jsxs("div", { className: "w-full min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex flex-col items-center px-4 pt-20 overflow-x-hidden relative", children: [_jsx("h1", { className: "text-5xl font-extrabold mb-10 text-center tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]", children: "Utility Package" }), _jsx("input", { type: "text", placeholder: "\uD83D\uDD0D \uC720\uD2F8\uB9AC\uD2F0 \uAC80\uC0C9...", value: search, onChange: (e) => setSearch(e.target.value), className: "mb-12 px-5 py-3 rounded-full bg-zinc-800 text-white text-base w-full max-w-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner" }), _jsx("div", { ref: containerRef, className: "w-full max-w-screen-xl px-6 md:px-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-8 place-items-center", children: filteredCards.map((card, index) => {
                    const isHovered = hoverIndex === index;
                    const isFocused = focusedIndex === index;
                    const scale = isFocused ? 1.5 : isHovered ? 1.1 : 1;
                    const zIndex = isFocused ? 50 : "auto";
                    return (_jsxs("div", { onMouseEnter: () => setHoverIndex(index), onMouseLeave: () => setHoverIndex(null), onClick: () => {
                            setFocusedIndex(index);
                            setTimeout(() => navigate(card.path), 300); // 클릭 시 확대 후 이동
                        }, style: {
                            transform: `scale(${scale})`,
                            zIndex,
                        }, className: "w-[180px] h-[240px] bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out relative hover:shadow-2xl", children: [_jsx("img", { src: card.image, alt: card.name, className: "w-5/6 h-2/3 object-contain m-auto mt-4" }), _jsx("div", { className: "h-1/3 flex items-center justify-center text-white font-semibold text-center px-2", children: card.name })] }, index));
                }) })] }));
};
export default MainPage;
