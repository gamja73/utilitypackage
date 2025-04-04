import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainPage'
import CustomScrollbar from "./components/customScrollbar";

function App() {
    return (
        <CustomScrollbar className="h-screen">
            <Routes>
                <Route path='/' element={<MainPage />} />
            </Routes>
        </CustomScrollbar>
    )
}

export default App
