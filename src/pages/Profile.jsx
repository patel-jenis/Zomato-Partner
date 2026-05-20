import { useEffect, useState } from "react";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiCamera,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchRestaurantProfile,
    logout,
} from "../redux/slices/authSlice";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth >= 640
    );

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
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                Restaurant Profile
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm">
                                Manage your restaurant information
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl shadow-2xl">
                            <div className="h-40 bg-gradient-to-r from-red-500 via-pink-500 to-indigo-900 relative">
                                <div className="absolute -bottom-14 left-8">
                                    <div className="relative">
                                        <img
                                            src={`https://zomato-clone-api-5e4m.onrender.com${user?.image}`}
                                            alt={user?.name || "Restaurant"}
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://ui-avatars.com/api/?name=Restaurant";
                                            }}
                                            className="w-28 h-28 rounded-full border-4 border-[#111827] object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-20 px-8 pb-8">
                                <div className="mb-8">
                                    <h2 className="text-4xl font-bold">
                                        {user?.name || "Restaurant Name"}
                                    </h2>
                                    <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/20">
                                        RESTAURANT
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 border-t border-white/10 pt-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center text-xl">
                                            <FiMail />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">
                                                Email
                                            </p>
                                            <h3 className="text-lg font-semibold">
                                                {user?.email || "restaurant@gmail.com"}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl">
                                            <FiPhone />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">
                                                Phone
                                            </p>
                                            <h3 className="text-lg font-semibold">
                                                {user?.phone || "+91 9876543210"}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center text-xl">
                                            <FiMapPin />
                                        </div>

                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">
                                                Address
                                            </p>
                                            <h3 className="text-lg font-semibold">
                                                {user?.address || "Surat"}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl">
                                            ●
                                        </div>

                                        <div>
                                            <p className="text-gray-400 text-sm mb-1">
                                                Account Status
                                            </p>
                                            <h3 className="text-lg font-semibold text-green-400">
                                                ACTIVE
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <p className="text-gray-400 text-sm">
                                        Member Since
                                    </p>
                                    <h3 className="font-semibold text-lg mt-1">
                                        May 2026
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;