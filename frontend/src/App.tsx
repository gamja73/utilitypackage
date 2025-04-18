import { Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/mainPage';
import useDarkMode from '@/components/useDarkMode';
import CustomScrollbar from "@/components/CustomScrollbar";
import CommonDetailPage from "@/pages/CommonDetailPage";
import TextUtilsPage from "@/pages/TextUtilsPage";
import TextEncodeDecodePage from "@/pages/TextEncodeDecodePage";
import RandomKeyGeneratorPage from "@/pages/RandomKeyGeneratorPage";
import NotFound from "@/pages/error/NotFound";
import QrGeneratorPage from "@/pages/QrGeneratorPage";
import ColorConverterPage from "@/pages/ColorConverter";
import JsonFormatterPage from "@/pages/JsonFormatterPage";

interface Card {
    name: string;
    description: string;
    image: string;
    path: string;
}

function App() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const cardData : Card[] = [
        // {
        //     name: "이미지 업스케일링",
        //     description: "저해상도 이미지를 AI 업스케일링 기술을 활용하여 고해상도로 선명하게 변환합니다.",
        //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/image-upscale",
        // },
        // {
        //     name: "이미지 변환 및 리사이즈",
        //     description: "이미지의 확장자를 변경하거나 크기를 조절합니다.",
        //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/image-convert-resize",
        // },
        // {
        //     name: "동영상 업스케일링",
        //     description: "저화질 영상을 AI 업스케일링 기술을 활용하여 고해상도로 향상시킵니다.",
        //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/video-upscale",
        // },
        // {
        //     name: "동영상 변환 및 리사이즈",
        //     description: "영상의 포맷을 변환하거나 해상도를 조절합니다.",
        //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/video-convert-resize",
        // },
        // {
        //     name: "영상 → 이미지 변환",
        //     description: "동영상을 프레임 단위 이미지로 추출합니다.",
        //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/video-to-image",
        // },
        // {
        //     name: "이미지 → 영상 변환",
        //     description: "여러 이미지를 이어붙여 동영상을 생성합니다.",
        //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/image-to-video",
        // },
        {
            name: "JSON 포매터",
            description: "지저분한 JSON을 보기 좋게 정렬하고 포맷팅합니다.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
            path: "/json-formatter",
        },
        {
            name: "텍스트 유틸리티",
            description: "대소문자 전환, 공백 제거, 텍스트 일괄 변경, 글자 수 세기 등 텍스트 관련 기능을 제공합니다.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
            path: "/text-utils",
        },
        {
            name: "텍스트 인코딩/디코딩",
            description: "URL, Base64 등 다양한 텍스트 인코딩과 디코딩을 지원합니다.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
            path: "/text-encode-decode",
        },
        {
            name: "랜덤 키 생성기",
            description: "안전한 무작위 문자열이나 토큰을 생성합니다.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
            path: "/random-key-generator",
        },
        // {
        //     name: "텍스트 비교",
        //     description: "두 개의 텍스트를 비교하여 차이점을 시각적으로 확인합니다.",
        //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/text-diff",
        // },
        {
            name: "QR 코드 생성기",
            description: "텍스트나 URL을 입력하면 QR 코드를 실시간으로 생성합니다.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
            path: "/qr-generator",
        },
        {
            name: "컬러 코드 변환기",
            description: "HEX, RGB, HSL 컬러 코드를 서로 변환하고 색상 미리보기를 제공합니다.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
            path: "/color-converter",
        },
        // {
        //     name: "엑셀 편집기",
        //     description: "엑셀(.xlsx) 파일을 업로드하여 내용을 열람하고 편집할 수 있습니다.",
        //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/excel-editor",
        // },
    ]

    return (
        <CustomScrollbar className="h-screen">
            <Routes>
                <Route path='/' element={<MainPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} cards={cardData}/>}/>
                <Route path="/image-upscale" element={<CommonDetailPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} title={"이미지 업스케일링"} innerElement={<TextUtilsPage/>}/>}/>
                <Route path="/text-utils" element={<CommonDetailPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} title={"텍스트 유틸리티"} innerElement={<TextUtilsPage/>}/>}/>
                <Route path="/text-encode-decode" element={<CommonDetailPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} title={"텍스트 인코딩/디코딩"} innerElement={<TextEncodeDecodePage isDarkMode={isDarkMode} />}/>}/>
                <Route path="/random-key-generator" element={<CommonDetailPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} title={"랜덤 키 생성기"} innerElement={<RandomKeyGeneratorPage/>}/>}/>
                <Route path="/qr-generator" element={<CommonDetailPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} title={"QR 코드 생성기"} innerElement={<QrGeneratorPage/>}/>}/>
                <Route path="/color-converter" element={<CommonDetailPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} title={"컬러 코드 변환기"} innerElement={<ColorConverterPage/>}/>}/>
                <Route path="/json-formatter" element={<CommonDetailPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} title={"JSON 포매터"} innerElement={<JsonFormatterPage/>}/>}/>
                <Route path="/*" element={<NotFound isDarkMode={isDarkMode}/>} />
            </Routes>
        </CustomScrollbar>
    );
}

export default App;
