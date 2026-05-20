import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiMail,
    FiLock,
    FiEye,
    FiEyeOff,
    FiArrowRight,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import {
    clearError,
    loginRestaurant,
} from "../redux/slices/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        dispatch(clearError());

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(clearError());

        const isValid = validateForm();
        if (!isValid) return;

        try {
            const result = await dispatch(
                loginRestaurant(formData)
            );

            if (result?.meta?.requestStatus === "fulfilled") {
                navigate("/");
            }

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-[#0A0F1F] flex items-center justify-center px-4 overflow-hidden relative">
            <div className="absolute top-[-120px] right-[-100px] w-[320px] h-[320px] bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-120px] left-[-100px] w-[320px] h-[320px] bg-red-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] overflow-hidden shadow-2xl">
                <div className="hidden lg:flex flex-col justify-center px-14 py-16 bg-gradient-to-br from-red-500 to-orange-400 relative overflow-hidden">
                    <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] bg-white/10 rounded-full"></div>
                    <div className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] bg-black/10 rounded-full"></div>
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-white text-4xl font-bold mb-8 shadow-lg">
                            Z
                        </div>
                        <h1 className="text-5xl font-bold text-white leading-tight">
                            Welcome to
                            <br />
                            Partner Hub
                        </h1>
                        <p className="text-white/80 mt-6 text-lg leading-relaxed">
                            Manage orders, menu items, revenue and restaurant activity from one dashboard.
                        </p>
                    </div>
                </div>

                <div className="p-8 sm:p-12 flex flex-col justify-center">
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold text-white">
                            Sign In
                        </h2>
                        <p className="text-gray-400 mt-2">
                            Access your restaurant dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="text-sm text-gray-300 mb-2 block">
                                Email Address
                            </label>
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4">
                                <FiMail className="text-gray-400 text-lg" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-4 text-white outline-none placeholder:text-gray-500"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="text-sm text-gray-300 mb-2 block">
                                Password
                            </label>
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4">
                                <FiLock className="text-gray-400 text-lg" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-4 text-white outline-none placeholder:text-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="text-gray-400 text-lg"
                                >
                                    {showPassword ? (
                                        <FiEyeOff />
                                    ) : (
                                        <FiEye />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-red-500 to-orange-400 py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg transition-all ${loading
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:opacity-90"
                            }`}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                            {!loading && <FiArrowRight />}
                        </button>

                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                Don't have an account?
                                <Link to="/signup" className="text-orange-400 hover:text-orange-300 ml-2 font-medium">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;