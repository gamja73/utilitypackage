import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage';
import CustomScrollbar from "./components/CustomScrollbar";
import useDarkMode from './components/useDarkMode';
import CommonPage from "@/pages/CommonPage";

function App() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <CustomScrollbar className="h-screen">
            <button
                onClick={toggleDarkMode}
                className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white shadow-md transition-colors"
            >
                {isDarkMode ? "🌙 다크 모드" : "☀️ 라이트 모드"}
            </button>

            <Routes>
                <Route path='/' element={<MainPage isDarkMode={isDarkMode} />} />
                <Route path="/image-upscale" element={<CommonPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
            </Routes>
        </CustomScrollbar>
    );
}

export default App;
