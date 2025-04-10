import React from "react";
import darkLogo from "@/assets/image/utility_package_logo_B.png";
import lightLogo from "@/assets/image/utility_package_logo_W.png";

interface DetailLayoutProps {
    title: string;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    children: React.ReactNode;
}

const DetailLayout = ({ title, isDarkMode, toggleDarkMode, children }: DetailLayoutProps) => {
    return (
        <div className="min-h-screen w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white transition-colors duration-300">
            {/* 상단 헤더 */}
            <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
                {/* 왼쪽: 로고 */}
                <img
                    src={isDarkMode ? lightLogo : darkLogo}
                    alt="Logo"
                    className="h-10 w-auto cursor-pointer"
                    onClick={() => window.location.href = "/"}
                />

                {/* 중앙: 제목 */}
                <h1 className="text-xl font-semibold">{title}</h1>

                {/* 오른쪽: 테마 토글 버튼 */}
                <button
                    onClick={toggleDarkMode}
                    className="px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white shadow transition-colors"
                >
                    {isDarkMode ? "🌙 다크 모드" : "☀️ 라이트 모드"}
                </button>
            </header>

            {/* 본문 영역 */}
            <main className="p-6">{children}</main>
        </div>
    );
};

export default DetailLayout;
