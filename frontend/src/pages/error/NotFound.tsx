interface PageProps {
    isDarkMode: boolean;
}

const NotFound = ({ isDarkMode }: PageProps) => {
    return (
        <div className="min-h-screen w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white transition-colors duration-300">
            <h1 className="text-zinc-900 dark:bg-zinc-900 dark:text-white transition-colors duration-300 text-xl text-center pt-20">Not Found</h1>
        </div>
    );
};

export default NotFound;
