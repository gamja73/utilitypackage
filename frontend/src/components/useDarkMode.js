import { useEffect, useState } from "react";
export default function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        }
        else if (savedTheme === "light") {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        }
        else {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        }
    }, []);
    const toggleDarkMode = () => {
        const html = document.documentElement;
        const isNowDark = html.classList.toggle("dark");
        setIsDarkMode(isNowDark);
        localStorage.setItem("theme", isNowDark ? "dark" : "light");
    };
    return { isDarkMode, toggleDarkMode };
}
