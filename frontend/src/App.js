import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/mainPage';
import CustomScrollbar from "@/components/CustomScrollbar";
import useDarkMode from '@/components/useDarkMode';
import CommonPage from "@/pages/CommonPage";
function App() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (_jsx(CustomScrollbar, { className: "h-screen", children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(MainPage, { isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode }) }), _jsx(Route, { path: "/image-upscale", element: _jsx(CommonPage, { isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode }) })] }) }));
}
export default App;
