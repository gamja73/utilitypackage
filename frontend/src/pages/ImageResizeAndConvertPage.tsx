import React, { useRef, useState, useEffect } from "react";
import apiRequest from "@/lib/ApiRequest";

const ResizeAndConvertPage = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [targetFormat, setTargetFormat] = useState<string>("png");
    const [isDragging, setIsDragging] = useState(false);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

    const supportedFormats = ["jpg", "jpeg", "png", "webp", "bmp", "tiff", "avif"];

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    // 이미지 크기 읽어오기
    useEffect(() => {
        if (!previewUrl) return;

        const img = new Image();
        img.src = previewUrl;
        img.onload = () => {
            setWidth(img.width);
            setHeight(img.height);
        };
    }, [previewUrl]);

    const handleConvert = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setConvertedUrl(null);

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("format", targetFormat);
        formData.append("width", width.toString());
        formData.append("height", height.toString());

        await apiRequest<string>({
            method: "POST",
            url: "/api/v1/image/convert",
            data: formData,
            onSuccess: async (response) => {
                setLoading(false);
                if (response)
                {
                    const fileResponse = await fetch(response);
                    const blob = await fileResponse.blob();

                    const blobUrl = URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = blobUrl;
                    link.download = `converted.${targetFormat}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    URL.revokeObjectURL(blobUrl);
                }
            },
            onError: (error) => {
                console.error("변환 실패:", error);
                setLoading(false);
            },
        });
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white px-4 py-10">
            <div
                className={`relative w-full max-w-5xl ${ previewUrl ? "h-auto p-2 sm:p-4" : "aspect-square" } border-4 border-dashed rounded-xl transition-all duration-300 ${isDragging ? "border-teal-400 bg-teal-50 dark:bg-teal-900/10" : "border-zinc-300 dark:border-zinc-600"} flex items-center justify-center cursor-pointer bg-white dark:bg-zinc-800`}
                onClick={handleBoxClick}
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e)}
            >
                {previewUrl ? (
                    <div className={"relative w-full"}>
                        <img
                            src={previewUrl}
                            alt="미리보기"
                            className={`w-full h-auto max-h-[80vh] object-contain rounded-md transition-all duration-300 ${
                                loading ? "blur-md" : "blur-0"
                            }`}
                        />
                        {loading && (
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-md">
                                <div
                                    className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"/>
                                <p className="text-white text-sm">이미지 변환 진행 중...</p>
                            </div>
                        )}
                    </div>

                ) : (
                    <div className="flex flex-col items-center text-zinc-500 dark:text-zinc-400">
                        <div className="text-4xl mb-2">📁</div>
                        <p className="text-center text-sm">이미지를 드래그하거나 클릭해서 업로드하세요</p>
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
                <div className="mt-8 w-full max-w-3xl flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">변환 확장자</label>
                            <select
                                value={targetFormat}
                                onChange={(e) => setTargetFormat(e.target.value)}
                                className="border rounded px-4 py-2 dark:bg-zinc-700"
                            >
                                {supportedFormats.map((format) => (
                                    <option key={format} value={format}>
                                        {format.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">가로 (width)</label>
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(parseInt(e.target.value))}
                                className="border rounded px-4 py-2 dark:bg-zinc-700"
                            />
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">세로 (height)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(parseInt(e.target.value))}
                                className="border rounded px-4 py-2 dark:bg-zinc-700"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleConvert}
                        disabled={loading}
                        className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition disabled:bg-gray-400"
                    >
                        {loading ? "변환 중..." : "변환 시작"}
                    </button>
                </div>
            )}

            {/* 결과 다운로드 */}
            {convertedUrl && (
                <div className="mt-8">
                    <a
                        href={convertedUrl}
                        download={`converted.${targetFormat}`}
                        className="px-6 py-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600 rounded-full text-zinc-800 dark:text-white font-semibold"
                    >
                        변환된 이미지 다운로드
                    </a>
                </div>
            )}
        </div>
    );
};

export default ResizeAndConvertPage;
