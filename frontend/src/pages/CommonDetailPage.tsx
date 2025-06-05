import DetailLayout from "@/components/DetailLayout";
import { JSX } from "react";

interface PageProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    title: string;
    icon: string;
    innerElement: JSX.Element;
}

const CommonDetailPage = ({ isDarkMode, toggleDarkMode, title, icon, innerElement }: PageProps) => {
    return (
        <DetailLayout
            title={title}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            icon={icon}
        >
            {innerElement}
        </DetailLayout>
    );
};

export default CommonDetailPage;
