import DetailLayout from "@/components/DetailLayout";
import {JSX} from "react";

interface PageProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    title: string;
    icon_B: string;
    icon_W: string;
    innerElement: JSX.Element;
}

const CommonDetailPage = ({ isDarkMode, toggleDarkMode, title, icon_B, icon_W, innerElement }: PageProps) => {
    return (
        <DetailLayout
            title={title}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            icon_B={icon_B}
            icon_W={icon_W}
        >
            {innerElement}
        </DetailLayout>
    );
};

export default CommonDetailPage;
