import {
    FiBell,
    FiMenu,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const Header = ({ sidebarOpen, setSidebarOpen, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="h-[70px] bg-[#111827]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-40">
            <button
                onClick={() => {
                    if (window.innerWidth >= 640) {
                        setSidebarOpen(!sidebarOpen);
                    }
                }}
                className="text-xl text-gray-300 hover:text-white transition-all">
                <FiMenu />
            </button>

            <div className="flex items-center gap-5 ml-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-gray-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-2xl backdrop-blur-xl text-sm font-medium"
                >
                    Logout
                </button>

                <button className="relative text-lg text-gray-300 hidden sm:block">
                    <FiBell />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="hidden sm:flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center font-semibold">
                        {user?.name?.charAt(0) || "R"}
                    </div>
                    <div>
                        <h3 className="font-medium text-sm">
                            {user?.name || "Restaurant"}
                        </h3>
                        <p className="text-gray-400 text-xs">
                            {user?.role || "Restaurant"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;