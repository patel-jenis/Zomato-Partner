import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiMail,
    FiLock,
    FiEye,
    FiEyeOff,
    FiArrowRight,
    FiUser,
    FiPhone,
    FiMapPin,
    FiImage,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerRestaurants } from "../redux/slices/authSlice";

const validateEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        image: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        dispatch(clearError());

        const { name, value, files } = e.target;

        if (name === "image") {
            setFormData({
                ...formData,
                image: files?.[0] || null,
            });
            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Restaurant name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!validateEmailFormat(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }
        else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
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
            const submitData = new FormData();

            submitData.append("name", formData.name);
            submitData.append("email", formData.email);
            submitData.append("password", formData.password);
            submitData.append("phone", formData.phone);
            submitData.append("address", formData.address);

            if (formData.image) {
                submitData.append("image", formData.image);
            }

            const result = await dispatch(
                registerRestaurants(submitData)
            );

            if (result?.meta?.requestStatus === "fulfilled") {
                navigate("/login");
            }

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-[#0A0F1F] flex items-center justify-center px-4 py-10 overflow-hidden relative">
            <div className="absolute top-[-120px] right-[-100px] w-[320px] h-[320px] bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-120px] left-[-100px] w-[320px] h-[320px] bg-red-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] overflow-hidden shadow-2xl">
                <div className="hidden lg:flex flex-col justify-center px-14 py-16 bg-gradient-to-br from-red-500 to-orange-400 relative overflow-hidden">
                    <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] bg-white/10 rounded-full"></div>
                    <div className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] bg-black/10 rounded-full"></div>
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-white text-4xl font-bold mb-8 shadow-lg">
                            Z
                        </div>
                        <h1 className="text-5xl font-bold text-white leading-tight">
                            Join the <br /> Partner Hub
                        </h1>
                        <p className="text-white/80 mt-6 text-lg leading-relaxed">
                            Register your restaurant and start managing orders, menu items and customers from one platform.
                        </p>
                    </div>
                </div>

                <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-white">Create Account</h2>
                        <p className="text-gray-400 mt-2">Register your restaurant partner account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="text-sm text-gray-300 mb-2 block">Restaurant Name</label>
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4">
                                <FiUser className="text-gray-400 text-lg" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-4 text-white outline-none"
                                />
                            </div>
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="text-sm text-gray-300 mb-2 block">Email Address</label>
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4">
                                <FiMail className="text-gray-400 text-lg" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-4 text-white outline-none"
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="text-sm text-gray-300 mb-2 block">Password</label>
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4">
                                <FiLock className="text-gray-400 text-lg" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-4 text-white outline-none"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="text-sm text-gray-300 mb-2 block">Phone Number</label>
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4">
                                <FiPhone className="text-gray-400 text-lg" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-4 text-white outline-none"
                                />
                            </div>
                            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="text-sm text-gray-300 mb-2 block">Restaurant Address</label>
                            <div className="flex items-start bg-white/5 border border-white/10 rounded-2xl px-4">
                                <FiMapPin className="text-gray-400 mt-5 text-lg" />
                                <textarea
                                    rows="3"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-4 text-white outline-none"
                                />
                            </div>
                            {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="text-sm text-gray-300 mb-2 block">Restaurant Image</label>
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4">
                                <FiImage className="text-gray-400 text-lg" />
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full bg-transparent p-4 text-gray-400 file:hidden"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-red-500 to-orange-400 py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 mt-6 transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}>
                            {loading ? "Creating Account..." : "Create Account"}

                            {!loading && <FiArrowRight />}
                        </button>

                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                Already have an account?
                                <Link
                                    to="/login"
                                    className="text-orange-400 hover:text-orange-300 ml-2 font-medium"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;