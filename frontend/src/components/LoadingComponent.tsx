const LoadingComponent = () => (
    <div className="flex items-center justify-center w-full h-full min-h-[300px]">
        <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 50 50">
            <circle
                className="opacity-25"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M25 5a20 20 0 1 1-14.14 34.14"
            />
        </svg>
    </div>
);

export default LoadingComponent;
