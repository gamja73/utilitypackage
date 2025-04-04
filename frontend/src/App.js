import { jsx as _jsx } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage';
import CustomScrollbar from "./components/customScrollbar";
function App() {
    return (_jsx(CustomScrollbar, { className: "h-screen", children: _jsx(Routes, { children: _jsx(Route, { path: '/', element: _jsx(MainPage, {}) }) }) }));
}
export default App;
