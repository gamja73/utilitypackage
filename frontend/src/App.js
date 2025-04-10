import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage';
import CustomScrollbar from "./components/CustomScrollbar";
import useDarkMode from './components/useDarkMode';
import CommonPage from "@/pages/CommonPage";
function App() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (_jsxs(CustomScrollbar, { className: "h-screen", children: [_jsx("button", { onClick: toggleDarkMode, className: "fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white shadow-md transition-colors", children: isDarkMode ? "🌙 다크 모드" : "☀️ 라이트 모드" }), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(MainPage, { isDarkMode: isDarkMode }) }), _jsx(Route, { path: "/image-upscale", element: _jsx(CommonPage, { isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode }) })] })] }));
}
export default App;
