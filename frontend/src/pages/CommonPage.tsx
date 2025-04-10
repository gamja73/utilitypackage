import DetailLayout from "@/components/DetailLayout";

interface PageProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const CommonPage = ({ isDarkMode, toggleDarkMode }: PageProps) => {
    return (
        <DetailLayout
            title="Common Page"
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
        >
            <div></div>
        </DetailLayout>
    );
};

export default CommonPage;
