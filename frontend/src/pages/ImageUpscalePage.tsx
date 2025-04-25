import React, {useRef, useState} from "react";
import apiRequest from '@/lib/ApiRequest';

const UpscalePage = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [upscaledUrl, setUpscaledUrl] = useState<string | null>(null);

    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setUpscaledUrl(null);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleUpscale = async () => {
        if (!imageFile) return;

        setLoading(true);
        setUpscaledUrl(null);

        // 이미지 폼 데이터로 변환
        const formData = new FormData();
        formData.append("image", imageFile);

        await apiRequest<string>({
            method: 'POST',
            url: '/api/v1/image/upscale',
            data: formData,
            onSuccess: (response) => {
                setUpscaledUrl(response);
                setPreviewUrl(response);
                setLoading(false);
            },
            onError: (error) => {
                console.error("Upscale 실패:", error);
                setLoading(false);
            },
        });
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-zinc-900 px-4 py-10 text-zinc-900 dark:text-white">
            <div
                className={`relative w-full max-w-5xl ${ previewUrl ? "h-auto p-2 sm:p-4" : "aspect-square" } border-4 border-dashed rounded-xl transition-all duration-300 ${isDragging ? "border-teal-400 bg-teal-50 dark:bg-teal-900/10" : "border-zinc-300 dark:border-zinc-600"} flex items-center justify-center cursor-pointer bg-white dark:bg-zinc-800`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleBoxClick}
            >
                {previewUrl ? (
                    <div className="relative w-full">
                        <img
                            src={previewUrl}
                            alt="업로드 이미지"
                            className={`w-full h-auto max-h-[80vh] object-contain rounded-md transition-all duration-300 ${
                                loading ? "blur-md" : "blur-0"
                            }`}
                        />

                        {loading && (
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-md">
                                <div
                                    className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"/>
                                <p className="text-white text-sm">이미지 업스케일링 진행 중...</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400">
                        <div className="text-4xl mb-2">📁</div>
                        <p className="text-center text-sm">
                            이미지를 드래그하거나<br/>클릭해서 선택하세요
                        </p>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {previewUrl && (
                <div className="mt-6 flex gap-4 flex-wrap justify-center">
                    <button
                        onClick={handleUpscale}
                        disabled={loading}
                        className="px-6 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-semibold transition disabled:bg-gray-400"
                    >
                        {loading ? "업스케일 중..." : "업스케일 시작"}
                    </button>

                    {upscaledUrl && (
                        <a
                            href={upscaledUrl}
                            download="upscaled-image.png"
                            className="px-6 py-2 rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 text-zinc-800 dark:text-white font-semibold transition"
                        >
                            다운로드
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default UpscalePage;
