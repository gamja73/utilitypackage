import { jsx as _jsx } from "react/jsx-runtime";
import DetailLayout from "@/components/DetailLayout";
const CommonPage = ({ isDarkMode, toggleDarkMode }) => {
    return (_jsx(DetailLayout, { title: "Common Page", isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode, children: _jsx("div", {}) }));
};
export default CommonPage;
