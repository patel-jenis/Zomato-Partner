import { useEffect, useState } from "react";
import {
    FiGrid,
    FiShoppingBag,
    FiClipboard,
    FiUser,
    FiBell,
    FiMenu,
    FiDollarSign,
    FiClock,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchRestaurantProfile,
    logout,
} from "../redux/slices/authSlice";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getFoods } from "../redux/slices/foodSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector((state) => state.auth);
    const { total } = useSelector((state) => state.food);

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth >= 640
    );

    useEffect(() => {
        dispatch(fetchRestaurantProfile());
        dispatch(getFoods());
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="h-screen flex bg-[#0B1120] text-white overflow-hidden text-[15px]">
            <Sidebar
                sidebarOpen={sidebarOpen}
                user={user}
            />

            <div className={` flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "ml-[230px]" : "ml-[85px]"}`}>

                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                />

                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#172554]">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">
                            Welcome back, {user?.name || "Restaurant"} 👋
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Here's what's happening with your restaurant today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">
                                        Total Orders
                                    </p>
                                    <h2 className="text-3xl font-bold">
                                        0
                                    </h2>
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center text-xl shadow-lg">
                                    <FiShoppingBag />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">
                                        Menu Items
                                    </p>
                                    <h2 className="text-3xl font-bold">
                                        {total}
                                    </h2>
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-xl shadow-lg">
                                    <FiGrid />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">
                                        Pending Orders
                                    </p>
                                    <h2 className="text-3xl font-bold">
                                        0
                                    </h2>
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-400 flex items-center justify-center text-xl shadow-lg">
                                    <FiClock />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-2">
                                        Revenue
                                    </p>
                                    <h2 className="text-3xl font-bold">
                                        ₹0
                                    </h2>
                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-xl shadow-lg">
                                    <FiDollarSign />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[calc(100vh-340px)]">
                        <div className="px-6 py-5 border-b border-white/10">
                            <h2 className="text-lg font-semibold">
                                Recent Orders
                            </h2>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl text-gray-500 mb-4">
                                <FiClipboard />
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                {loading ? "Loading..." : "No Orders Yet"}
                            </h3>

                            <p className="text-gray-400 text-sm">
                                Your recent restaurant orders will appear here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;