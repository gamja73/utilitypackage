import DetailLayout from "@/components/DetailLayout";

interface PageProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    title: string;
}

const TextUtilsPage = ({ isDarkMode, toggleDarkMode, title }: PageProps) => {
    return (
        <DetailLayout
            title={title}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
        >
            <div></div>
        </DetailLayout>
    );
};

export default TextUtilsPage;
