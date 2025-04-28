import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white px-4 py-10">
            <h1 className="text-6xl font-bold mb-6">404</h1>
            <p className="text-2xl font-semibold mb-4">페이지를 찾을 수 없습니다</p>
            <p className="text-center mb-8 text-zinc-500 dark:text-zinc-400">
                존재하지 않거나 이동된 페이지입니다.
            </p>

            <div className="flex gap-4">
                <button onClick={handleGoBack} className="px-6 py-3 bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-white font-bold rounded-full transition">
                    이전 페이지
                </button>
                <button onClick={handleGoHome} className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-full transition">
                    홈으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default NotFound;
