import { Button } from '@/components/Button';
import {useState} from "react";
import apiRequest from "@/lib/ApiRequest";

const DomainInformationPage = () => {
    const [domain, setDomain] = useState("");
    const [domainInfo, setDomainInfo] = useState("");

    const getDomainInfo = async () => {
        await apiRequest<string>({
            method: 'GET',
            url: '/api/v1/domain/info',
            params: { domain: domain },
            onSuccess: (res) => {
                setDomainInfo(res);
            },
            onError: (error) => {
                console.error(error);
            },
        });
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex items-center justify-center gap-4 w-full">
                <div className="flex items-start justify-center">
                    <label htmlFor="domain" className=""></label>
                    <input
                        id="domain"
                        type="text"
                        onChange={(e) => setDomain(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") getDomainInfo()
                        }}
                        className="w-full px-2 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        placeholder="도메인 입력"
                    />
                </div>
                <Button onClick={ getDomainInfo }>조회</Button>
            </div>

            <div className="w-full max-w-2xl mt-6 flex flex-col gap-2"><pre className="whitespace-pre-wrap">{ domainInfo }</pre></div>
        </div>
    );
};

export default DomainInformationPage;
