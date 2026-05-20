import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <div className="min-h-screen bg-[#0A0F1F] flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-[120px] sm:text-[160px] font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent leading-none">
                    404
                </h1>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
                    Page Not Found
                </h2>
                <p className="text-gray-400 mt-4 max-w-md mx-auto">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="
                        inline-flex
                        items-center
                        justify-center
                        mt-8
                        px-8
                        py-4
                        rounded-2xl
                        bg-gradient-to-r
                        from-red-500
                        to-orange-400
                        text-white
                        font-semibold
                        hover:opacity-90
                        transition-all
                    "
                >
                    Back To Dashboard
                </Link>
            </div>
        </div>
    );
};

export default NotFound;