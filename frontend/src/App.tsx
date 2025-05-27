import {JSX} from "react";
import { Routes, Route } from 'react-router-dom';

import MainPage from '@/pages/MainPage';
import NotFound from "@/pages/error/NotFound";
import TextUtilsPage from "@/pages/TextUtilsPage";
import useDarkMode from '@/components/useDarkMode';
import QrGeneratorPage from "@/pages/QrGeneratorPage";
import ImageUpscalePage from "@/pages/ImageUpscalePage";
import CommonDetailPage from "@/pages/CommonDetailPage";
import ColorConverterPage from "@/pages/ColorConverter";
import JsonFormatterPage from "@/pages/JsonFormatterPage";
import CustomScrollbar from "@/components/CustomScrollbar";
import TextEncodeDecodePage from "@/pages/TextEncodeDecodePage";
import RandomKeyGeneratorPage from "@/pages/RandomKeyGeneratorPage";
import ImageResizeAndConvertPage from "@/pages/ImageResizeAndConvertPage";
import DomainInformationPage from "@/pages/DomainInformation";
import Ipv4ToIpv6Page from "@/pages/Ipv4ToIpv6Page";
import MulticastConverterPage from "@/pages/MulticastConverterPage";

interface Card {
    name: string;
    description: string;
    image_B: string;
    image_W: string;
    path: string;
    page: JSX.Element;
}

function App() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const cardData : Card[] = [
        {
            name: "이미지 업스케일링",
            description: "저해상도 이미지를 AI 업스케일링 기술을 활용하여 고해상도로 선명하게 변환합니다.",
            image_B: "https://cdn.utilitypackage.it.kr/icon/imageUpscale_B.png",
            image_W: "https://cdn.utilitypackage.it.kr/icon/imageUpscale_W.png",
            path: "/image-upscale",
            page: <ImageUpscalePage />,
        },
        {
            name: "이미지 변환 및 리사이즈",
            description: "이미지의 확장자를 변경하거나 크기를 조절합니다.",
            image_B: "https://cdn.utilitypackage.it.kr/icon/imageConvertResize_B.png",
            image_W: "https://cdn.utilitypackage.it.kr/icon/imageConvertResize_W.png",
            path: "/image-convert-resize",
            page: <ImageResizeAndConvertPage />,
        },
        // {
        //     name: "동영상 업스케일링",
        //     description: "저화질 영상을 AI 업스케일링 기술을 활용하여 고해상도로 향상시킵니다.",
        //     image_B: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     image_W: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/video-upscale",
        //     page: commonDetailPage
        // },
        // {
        //     name: "동영상 변환 및 리사이즈",
        //     description: "영상의 포맷을 변환하거나 해상도를 조절합니다.",
        //     image_B: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     image_W: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/video-convert-resize",
        //     page: commonDetailPage,
        // },
        // {
        //     name: "영상 → 이미지 변환",
        //     description: "동영상을 프레임 단위 이미지로 추출합니다.",
        //     image_B: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     image_W: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/video-to-image",
        //     page: commonDetailPage,
        // },
        // {
        //     name: "이미지 → 영상 변환",
        //     description: "여러 이미지를 이어붙여 동영상을 생성합니다.",
        //     image_B: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     image_W: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/image-to-video",
        //     page: commonDetailPage,
        // },
        {
            name: "JSON 포매터",
            description: "지저분한 JSON을 보기 좋게 정렬하고 포맷팅합니다.",
            image_B: "https://cdn.utilitypackage.it.kr/icon/jsonFormatter_B.png",
            image_W: "https://cdn.utilitypackage.it.kr/icon/jsonFormatter_W.png",
            path: "/json-formatter",
            page: <JsonFormatterPage />,
        },
        {
            name: "텍스트 유틸리티",
            description: "대소문자 전환, 공백 제거, 텍스트 일괄 변경, 글자 수 세기 등 텍스트 관련 기능을 제공합니다.",
            image_B: "https://cdn.utilitypackage.it.kr/icon/textUtils_B.png",
            image_W: "https://cdn.utilitypackage.it.kr/icon/textUtils_W.png",
            path: "/text-utils",
            page: <TextUtilsPage />,
        },
        {
            name: "텍스트 인코딩/디코딩",
            description: "URL, Base64 등 다양한 텍스트 인코딩과 디코딩을 지원합니다.",
            image_B: "https://cdn.utilitypackage.it.kr/icon/textEncodeDecode_B.png",
            image_W: "https://cdn.utilitypackage.it.kr/icon/textEncodeDecode_W.png",
            path: "/text-encode-decode",
            page: <TextEncodeDecodePage isDarkMode={isDarkMode} />,
        },
        {
            name: "랜덤 키 생성기",
            description: "안전한 무작위 문자열이나 토큰을 생성합니다.",
            image_B: "https://cdn.utilitypackage.it.kr/icon/randomKeyGenerator_B.png",
            image_W: "https://cdn.utilitypackage.it.kr/icon/randomKeyGenerator_W.png",
            path: "/random-key-generator",
            page: <RandomKeyGeneratorPage />,
        },
        // {
        //     name: "텍스트 비교",
        //     description: "두 개의 텍스트를 비교하여 차이점을 시각적으로 확인합니다.",
        //     image_B: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     image_W: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
        //     path: "/text-diff",
        //     page: commonDetailPage,
        // },
        {
            name: "QR 코드 생성기",
            description: "텍스트나 URL을 입력하면 QR 코드를 실시간으로 생성합니다.",
            image_B: "https://cdn.utilitypackage.it.kr/icon/qrGenerator_B.png",
            image_W: "https://cdn.utilitypackage.it.kr/icon/qrGenerator_W.png",
            path: "/qr-generator",
            page: <QrGeneratorPage />,
        },
        {
            name: "컬러 코드 변환기",
            description: "HEX, RGB, HSL 컬러 코드를 서로 변환하고 색상 미리보기를 제공합니다.",
            image_B: "https://cdn.utilitypackage.it.kr/icon/colorConverter_B.png",
            image_W: "https://cdn.utilitypackage.it.kr/icon/colorConverter_W.png",
            path: "/color-converter",
            page: <ColorConverterPage />,
        },
        {
            name: "도메인 정보 조회",
            description: "도메인을 입력하면 해당 도메인의 정보를 whois.kr 에서 조회합니다.",
            image_B: "Null",
            image_W: "Null",
            path: "/domain-information",
            page: <DomainInformationPage />
        },
        {
            name: "IPv4 IPv6 상호 변환",
            description: "IPv4 주소를 IPv6 주소로 변환하거나 IPv6 주소를 IPv4 주소로 변환합니다.",
            image_B: "Null",
            image_W: "Null",
            path: "/ipv4-to-ipv6",
            page: <Ipv4ToIpv6Page />
        },
        {
            name: "Multicast IP MAC 주소 상호 변환",
            description: "Multicast IP 주소를 MAC 주소로 변환하거나 MAC 주소를 Multicast IP로 변환합니다.",
            image_B: "Null",
            image_W: "Null",
            path: "/multicast-ip-mac",
            page: <MulticastConverterPage />
        }
    ]

    return (
        <CustomScrollbar className="h-screen">
            <Routes>
                <Route path='/' element={<MainPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} cards={cardData}/>}/>
                {
                    cardData.map((card, index) => (
                        <Route key={index} path={card.path} element={
                                <CommonDetailPage
                                    isDarkMode={isDarkMode}
                                    toggleDarkMode={toggleDarkMode}
                                    title={card.name}
                                    icon_B={card.image_B}
                                    icon_W={card.image_W}
                                    innerElement={card.page}
                                />
                            }
                        />
                    ))
                }
                <Route path="/*" element={<NotFound/>} />
            </Routes>
        </CustomScrollbar>
    );
}

export default App;
