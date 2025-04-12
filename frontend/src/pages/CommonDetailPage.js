import { jsx as _jsx } from "react/jsx-runtime";
import DetailLayout from "@/components/DetailLayout";
const CommonDetailPage = ({ isDarkMode, toggleDarkMode, title, innerElement }) => {
    return (_jsx(DetailLayout, { title: title, isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode, children: innerElement }));
};
export default CommonDetailPage;
