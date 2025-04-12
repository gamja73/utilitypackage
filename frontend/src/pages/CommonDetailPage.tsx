import DetailLayout from "@/components/DetailLayout";
import {JSX} from "react";

interface PageProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    title: string;
    innerElement: JSX.Element;
}

const CommonDetailPage = ({ isDarkMode, toggleDarkMode, title, innerElement }: PageProps) => {
    return (
        <DetailLayout
            title={title}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
        >
            {innerElement}
        </DetailLayout>
    );
};

export default CommonDetailPage;
