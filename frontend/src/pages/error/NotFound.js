import { jsx as _jsx } from "react/jsx-runtime";
const NotFound = ({ isDarkMode }) => {
    return (_jsx("div", { className: "min-h-screen w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white transition-colors duration-300", children: _jsx("h1", { className: "text-zinc-900 dark:bg-zinc-900 dark:text-white transition-colors duration-300 text-xl text-center pt-20", children: "Not Found" }) }));
};
export default NotFound;
