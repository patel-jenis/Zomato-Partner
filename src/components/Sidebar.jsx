import {
    FiGrid,
    FiClipboard,
    FiUser,
    FiBox,
} from "react-icons/fi";
import {
    Link,
    useLocation,
} from "react-router-dom";

const Sidebar = ({ sidebarOpen, user }) => {
    const location = useLocation();

    return (
        <div
            className={`${sidebarOpen ? "w-[230px]" : "w-[85px]"} h-screen bg-[#111827] border-r border-white/10 flex flex-col transition-all duration-300 fixed left-0 top-0 z-50`}>

            <div className="h-[70px] px-5 border-b border-white/10 flex items-center">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-11 h-11 min-w-[44px] rounded-2xl bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center font-bold text-lg shadow-lg">
                        Z
                    </div>

                    {
                        sidebarOpen && (
                            <div>
                                <h1 className="font-bold text-base whitespace-nowrap">
                                    Zomato Partner
                                </h1>
                                <p className="text-gray-400 text-xs whitespace-nowrap">
                                    Restaurant Panel
                                </p>
                            </div>
                        )
                    }

                </div>
            </div>

            <div className="flex-1 p-4 space-y-2 overflow-y-auto">

                <Link to="/" className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === "/" ? "bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-lg" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                    <FiGrid className="text-lg min-w-[20px]" />
                    {
                        sidebarOpen && "Dashboard"
                    }
                </Link>

                <Link to="/foods" className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === "/foods" ? "bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-lg" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                    <FiBox className="text-lg min-w-[20px]" />
                    {
                        sidebarOpen && "Menu Items"
                    }
                </Link>

                <Link to="/orders" className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === "/orders" ? "bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-lg" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                    <FiClipboard className="text-lg min-w-[20px]" />
                    {
                        sidebarOpen && "Orders"
                    }
                </Link>

                <Link to="/profile" className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === "/profile" ? "bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-lg" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                    <FiUser className="text-lg min-w-[20px]" />
                    {
                        sidebarOpen && "Profile"
                    }
                </Link>
            </div>

            <div className="p-5 border-t border-white/10 bg-white/[0.03]">
                {
                    sidebarOpen && (
                        <p className="text-gray-500 text-[11px] uppercase mb-2">
                            Logged In As
                        </p>
                    )
                }

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center font-semibold min-w-[40px]">
                        {user?.name?.charAt(0) || "R"}
                    </div>

                    {
                        sidebarOpen && (
                            <div>

                                <h3 className="font-medium text-sm">
                                    {user?.name || "Restaurant"}
                                </h3>

                                <p className="text-gray-400 text-xs">
                                    {user?.role || "Restaurant"}
                                </p>

                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Sidebar;