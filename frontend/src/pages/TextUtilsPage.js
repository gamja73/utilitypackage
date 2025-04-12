import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TextUtilsPage = () => {
    const handleTextChange = (event) => {
        const text = event.target.value;
        const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
        const charCount = text.length;
        document.getElementById("wordCount").innerText = `단어 수: ${wordCount}`;
        document.getElementById("charCount").innerText = `글자 수: ${charCount}`;
    };
    const handleButtonClick = (action) => {
        const textArea = document.getElementById("textArea");
        let text = textArea.value;
        switch (action) {
            case "uppercase":
                text = text.toUpperCase();
                break;
            case "lowercase":
                text = text.toLowerCase();
                break;
            case "removeSpaces":
                text = text.replace(/\s+/g, "");
                break;
            case "removeLineBreak":
                text = text.replace(/\n+/g, "");
                break;
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
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("textarea", { id: "textArea", className: "w-full h-40 p-2 border rounded-md border-gray-300 bg-transparent outline-none text-zinc-800 dark:text-white text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none", placeholder: "\uD14D\uC2A4\uD2B8\uB97C \uC785\uB825\uD558\uC138\uC694...", onInput: handleTextChange }), _jsxs("div", { className: "flex flex-wrap gap-2 mt-4", children: [_jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", onClick: () => handleButtonClick("uppercase"), children: "\uB300\uBB38\uC790\uB85C \uBCC0\uD658" }), _jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", onClick: () => handleButtonClick("lowercase"), children: "\uC18C\uBB38\uC790\uB85C \uBCC0\uD658" }), _jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", onClick: () => handleButtonClick("removeSpaces"), children: "\uACF5\uBC31 \uC81C\uAC70" }), _jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", onClick: () => handleButtonClick("removeLineBreak"), children: "\uC904\uBC14\uAFC8 \uC81C\uAC70" }), _jsx("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600", onClick: () => handleButtonClick("replaceText"), children: "\uD14D\uC2A4\uD2B8 \uBCC0\uACBD" })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { id: "wordCount", className: "text-gray-700 dark:text-white text-base", children: "\uAE00\uC790 \uC218: 0" }), _jsx("p", { id: "charCount", className: "text-gray-700 dark:text-white text-base", children: "\uB2E8\uC5B4 \uC218: 0" })] })] }));
};
export default TextUtilsPage;
