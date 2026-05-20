import { useEffect, useState } from "react";
import {
    FiShoppingBag,
    FiClock,
    FiCheckCircle,
    FiTruck,
    FiPackage,
    FiChevronDown,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchRestaurantProfile,
    logout,
} from "../redux/slices/authSlice";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth >= 640
    );
    const [statusFilter, setStatusFilter] = useState("");

    const orders = [];

    useEffect(() => {
        dispatch(fetchRestaurantProfile());
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

    const filteredOrders = orders.filter((order) =>
        statusFilter === ""
            ? true
            : order.status === statusFilter
    );

    return (
        <div className="h-screen flex bg-[#0B1120] text-white overflow-hidden text-[15px]">
            <Sidebar
                sidebarOpen={sidebarOpen}
                user={user}
            />

            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "ml-[230px]" : "ml-[85px]"}`}>
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                />

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#172554]">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">
                            Orders
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Manage all restaurant orders
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-2xl mb-3">
                                    <FiClock />
                                </div>

                                <h2 className="text-3xl font-bold">
                                    0
                                </h2>

                                <p className="text-gray-400 text-sm mt-1">
                                    Pending
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl mb-3">
                                    <FiCheckCircle />
                                </div>

                                <h2 className="text-3xl font-bold">
                                    0
                                </h2>

                                <p className="text-gray-400 text-sm mt-1">
                                    Confirmed
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-2xl mb-3">
                                    <FiPackage />
                                </div>

                                <h2 className="text-3xl font-bold">
                                    0
                                </h2>

                                <p className="text-gray-400 text-sm mt-1">
                                    Preparing
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-3">
                                    <FiTruck />
                                </div>

                                <h2 className="text-3xl font-bold">
                                    0
                                </h2>

                                <p className="text-gray-400 text-sm mt-1">
                                    Delivery
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center text-2xl mb-3">
                                    <FiShoppingBag />
                                </div>

                                <h2 className="text-3xl font-bold">
                                    0
                                </h2>

                                <p className="text-gray-400 text-sm mt-1">
                                    Delivered
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
                        <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-5 border-b border-white/10 text-gray-400 text-sm font-medium">
                            <p>ORDER ID</p>
                            <p>ITEMS</p>
                            <p>TOTAL</p>
                            <p>STATUS</p>
                            <p>PLACED</p>
                            <p className="text-right">
                                ACTIONS
                            </p>
                        </div>

                        {
                            filteredOrders.length === 0 && (
                                <div className="py-10 text-center">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center text-4xl text-gray-500 mb-4">
                                        <FiShoppingBag />
                                    </div>

                                    <h3 className="text-xl font-semibold mb-2">
                                        No Orders Available
                                    </h3>

                                    <p className="text-gray-400 text-sm">
                                        No orders available
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;