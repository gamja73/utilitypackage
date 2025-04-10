import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import darkLogo from "@/assets/image/utility_package_logo_B.png";
import lightLogo from "@/assets/image/utility_package_logo_W.png";
const DetailLayout = ({ title, isDarkMode, toggleDarkMode, children }) => {
    return (_jsxs("div", { className: "min-h-screen w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white transition-colors duration-300", children: [_jsxs("header", { className: "flex justify-between items-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-700", children: [_jsx("img", { src: isDarkMode ? lightLogo : darkLogo, alt: "Logo", className: "h-10 w-auto cursor-pointer", onClick: () => window.location.href = "/" }), _jsx("h1", { className: "text-xl font-semibold", children: title }), _jsx("button", { onClick: toggleDarkMode, className: "px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white shadow transition-colors", children: isDarkMode ? "🌙 다크 모드" : "☀️ 라이트 모드" })] }), _jsx("main", { className: "p-6", children: children })] }));
};
export default DetailLayout;
