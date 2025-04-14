import {useRef, useState} from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/Button';

const QrGeneratorPage = () => {
    const [text, setText] = useState('');
    const [qrText, setQrText] = useState('');
    const qrRef = useRef<HTMLCanvasElement | null>(null);

    const handleGenerate = () => {
        setQrText(text.trim());
    };

    const handleDownload = () => {
        const canvas = qrRef.current;
        if (canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = url;
            link.download = "qr-code.png";
            link.click();
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
        <textarea
            rows={4}
            placeholder="QR 코드로 변환할 텍스트나 URL을 입력하세요"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full max-w-xl px-4 py-3 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white shadow-sm"
        />
            <div className="flex flex-wrap gap-3">
                <Button onClick={handleGenerate}>QR 코드 생성</Button>
                {qrText && <Button onClick={handleDownload}>QR 코드 다운로드</Button>}
            </div>

            {qrText && (
                <div className="mt-6 p-4 border rounded-md bg-white dark:bg-zinc-800">
                    <QRCodeCanvas
                        value={qrText}
                        size={192}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        includeMargin={true}
                        ref={qrRef}
                    />
                </div>
            )}
        </div>
    );
};

export default QrGeneratorPage;
