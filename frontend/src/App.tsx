import { Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/mainPage';
import CustomScrollbar from "@/components/CustomScrollbar";
import useDarkMode from '@/components/useDarkMode';
import CommonPage from "@/pages/CommonPage";

function App() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <CustomScrollbar className="h-screen">
            <Routes>
                <Route path='/' element={<MainPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>}/>
                <Route path="/image-upscale" element={<CommonPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>}/>
            </Routes>
        </CustomScrollbar>
    );
}

export default App;
