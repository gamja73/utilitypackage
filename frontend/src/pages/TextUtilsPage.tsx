import React from "react";

const TextUtilsPage = () => {
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = event.target.value;
        const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
        const charCount = text.length;
        document.getElementById("wordCount")!.innerText = `단어 수: ${wordCount}`;
        document.getElementById("charCount")!.innerText = `글자 수: ${charCount}`;
    }

    const handleButtonClick = (action: string) => {
        const textArea = document.getElementById("textArea") as HTMLTextAreaElement;
        let text = textArea.value;

        switch (action)
        {
            case "uppercase": text = text.toUpperCase(); break;
            case "lowercase": text = text.toLowerCase(); break;
            case "removeSpaces": text = text.replace(/\s+/g, ""); break;
            case "removeLineBreak": text = text.replace(/\n+/g, ""); break;
            case "replaceText":
                const targetText = prompt("변경될 텍스트를 입력하세요:");
                const afterText = prompt("변경할 텍스트를 입력하세요:");

                if (targetText !== null && afterText !== null) {
                    text = text.replaceAll(targetText, afterText);
                }
                break;
            default:
                break;
        }

        textArea.value = text;
    }

    return (
        <div className="p-4">
            <textarea
                id="textArea"
                className="w-full h-40 p-2 border rounded-md border-gray-300 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none"
                placeholder="텍스트를 입력하세요..."
                onInput={handleTextChange}
            ></textarea>
            <div className="flex flex-wrap gap-2 mt-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleButtonClick("uppercase")}>대문자로 변환</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleButtonClick("lowercase")}>소문자로 변환</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleButtonClick("removeSpaces")}>공백 제거</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleButtonClick("removeLineBreak")}>줄바꿈 제거</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleButtonClick("replaceText")}>텍스트 변경</button>
            </div>
            <div className="mt-4">
                <p id="wordCount" className="text-gray-700 dark:text-white text-base">글자 수: 0</p>
                <p id="charCount" className="text-gray-700 dark:text-white text-base">단어 수: 0</p>
            </div>
        </div>
    );
};

export default TextUtilsPage;