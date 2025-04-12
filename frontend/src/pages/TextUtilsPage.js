import { jsx as _jsx } from "react/jsx-runtime";
import DetailLayout from "@/components/DetailLayout";
const TextUtilsPage = ({ isDarkMode, toggleDarkMode, title }) => {
    return (_jsx(DetailLayout, { title: title, isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode, children: _jsx("div", {}) }));
};
export default TextUtilsPage;
