interface DarkModeToggleProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }: DarkModeToggleProps) => (
    <div className="static">
        <label className="flex items-center cursor-pointer">
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="sr-only"/>
            <div className="relative w-24 h-10 bg-zinc-300 dark:bg-zinc-700 rounded-full shadow-inner transition-colors px-2 flex items-center">
                <div className={`absolute top-1 text-xl transition-all duration-300 ${isDarkMode ? "left-3" : "right-3"}`}>{isDarkMode ? "🌙" : "☀️"}</div>
                <div className={`absolute top-1 w-8 h-8 rounded-full bg-white shadow transition-transform transform ${isDarkMode ? "translate-x-[3.25rem]" : "translate-x-0"}`}/>
            </div>
        </label>
    </div>
);

export default DarkModeToggle;
