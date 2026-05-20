import { useEffect, useState } from "react";
import {
    FiEdit2,
    FiTrash2,
    FiX,
    FiImage,
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
import { addFood, deleteFood, getFoods, updateFood } from "../redux/slices/foodSlice";
import Swal from "sweetalert2";

const getFoodImage = (img) => {
    if (!img) {
        return "https://ui-avatars.com/api/?name=Food";
    }

    if (img.startsWith("http")) {
        return img;
    }

    return `https://zomato-clone-api-5e4m.onrender.com${img}`;
};

const Foods = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { items, loading } = useSelector((state) => state.food);

    const [sidebarOpen, setSidebarOpen] = useState(
        window.innerWidth >= 640
    );
    const [openModal, setOpenModal] = useState(false);
    const [editFoodId, setEditFoodId] = useState(null);
    const [foodData, setFoodData] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
        isAvailable: true,
        image: null,
    });
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [previewImage, setPreviewImage] = useState("");

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFoodData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFoodData((prev) => ({
                ...prev,
                image: file,
            }));

            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleAddFood = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("title", foodData.title);
            formData.append("price", foodData.price);
            formData.append("category", foodData.category);
            formData.append("description", foodData.description);
            formData.append("isAvailable", foodData.isAvailable);

            if (foodData.image) {
                formData.append("image", foodData.image);
            }

            if (editFoodId) {

                await dispatch(
                    updateFood({
                        foodId: editFoodId,
                        formData,
                    })
                ).unwrap();

                Swal.fire({
                    title: "Updated!",
                    text: "Food item updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#ef4444",
                    background: "#111827",
                    color: "#fff",
                });

            } else {

                await dispatch(addFood(formData)).unwrap();

                Swal.fire({
                    title: "Added!",
                    text: "Food item added successfully.",
                    icon: "success",
                    confirmButtonColor: "#ef4444",
                    background: "#111827",
                    color: "#fff",
                });
            }

            setOpenModal(false);

            setEditFoodId(null);

            setFoodData({
                title: "",
                price: "",
                category: "",
                description: "",
                isAvailable: true,
                image: null,
            });

            setPreviewImage("");

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong.",
                icon: "error",
                confirmButtonColor: "#ef4444",
                background: "#111827",
                color: "#fff",
            });
        }
    };

    const handleEditFood = (item) => {
        setEditFoodId(item._id);

        setFoodData({
            title: item.title,
            price: item.price,
            category: item.category,
            description: item.description,
            isAvailable: item.isAvailable,
            image: null,
        });

        setPreviewImage(
            item.image
                ? `https://zomato-clone-api-5e4m.onrender.com${item.image}`
                : ""
        );

        setOpenModal(true);
    };

    const handleDeleteFood = async (foodId) => {

        const result = await Swal.fire({
            title: "Delete Item?",
            text: "This food item will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#374151",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            background: "#111827",
            color: "#fff",
            borderRadius: "20px",
        });

        if (!result.isConfirmed) return;

        try {
            await dispatch(deleteFood(foodId)).unwrap();

            Swal.fire({
                title: "Deleted!",
                text: "Food item deleted successfully.",
                icon: "success",
                confirmButtonColor: "#ef4444",
                background: "#111827",
                color: "#fff",
                borderRadius: "20px",
            });

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to delete item.",
                icon: "error",
                confirmButtonColor: "#ef4444",
                background: "#111827",
                color: "#fff",
                borderRadius: "20px",
            });
        }
    };

    const filteredItems = items.filter((item) => {

        const matchesCategory =
            category === "" || item.category === category;

        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

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

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#172554]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                Menu Items
                            </h1>
                            <p className="text-gray-400 mt-1 text-sm">
                                Manage all your restaurant food items
                            </p>
                        </div>

                        <button
                            onClick={() => setOpenModal(true)}
                            className="bg-gradient-to-r from-red-500 to-orange-400 hover:opacity-90 transition-all px-5 py-3 rounded-2xl font-medium shadow-lg"
                        >
                            + Add Item
                        </button>

                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search food items..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-5 text-white placeholder:text-gray-500 outline-none focus:border-red-500/50"
                            />
                        </div>

                        <div className="relative min-w-[220px]">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="appearance-none w-full bg-[#111827] border border-white/10 rounded-2xl h-14 px-5 pr-12 text-white outline-none focus:border-red-500/50 cursor-pointer"
                            >

                                <option value="">All Categories</option>
                                <option value="Starter">Starter</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Other">Other</option>

                            </select>

                            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                        <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-4 border-b border-white/10 text-gray-400 text-sm font-medium">
                            <p>Image</p>
                            <p>Title</p>
                            <p>Category</p>
                            <p>Price</p>
                            <p>Status</p>
                            <p className="text-right">Actions</p>
                        </div>

                        {
                            loading ? (

                                <div className="py-16 flex justify-center items-center">
                                    <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>

                            ) : filteredItems.length > 0 ? (

                                filteredItems.map((item, index) => (

                                    <div
                                        key={item?._id || index}
                                        className="grid md:grid-cols-6 gap-4 items-center px-6 py-5 border-b border-white/10"
                                    >
                                        <div>
                                            <img
                                                src={getFoodImage(item?.image)}
                                                alt="Food"
                                                className="w-16 h-16 rounded-2xl object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://ui-avatars.com/api/?name=Food";
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {item?.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm">
                                                {item?.description}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/20">
                                                {item?.category}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-red-400">
                                                ₹{item?.price}
                                            </h3>
                                        </div>

                                        <div>
                                            <span
                                                className={`
                                                    text-xs px-3 py-1 rounded-full border
                                                    ${item?.isAvailable
                                                        ? "bg-green-500/20 text-green-400 border-green-500/20"
                                                        : "bg-red-500/20 text-red-400 border-red-500/20"
                                                    }
                                                `}
                                            >
                                                {item?.isAvailable ? "Available" : "Unavailable"}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-end gap-3">

                                            <button
                                                onClick={() => handleEditFood(item)}
                                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all flex items-center justify-center"
                                            >
                                                <FiEdit2 />
                                            </button>

                                            <button
                                                onClick={() => handleDeleteFood(item?._id)}
                                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all flex items-center justify-center"
                                            >
                                                <FiTrash2 />
                                            </button>

                                        </div>

                                    </div>
                                ))

                            ) : (
                                <div className="py-16 text-center text-gray-400">
                                    No food items found
                                </div>
                            )
                        }

                    </div>

                </div>
            </div>

            {
                openModal && (
                    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
                        <div className="w-full max-w-[470px] bg-[#111827] border border-white/10 rounded-[28px] shadow-2xl my-auto max-h-[95vh] overflow-y-auto">
                            <div className="sticky top-0 z-10 bg-[#111827] border-b border-white/10 flex items-center justify-between px-4 sm:px-5 py-4">
                                <h2 className="text-lg sm:text-xl font-bold">
                                    {editFoodId ? "Edit Food Item" : "Add Food Item"}
                                </h2>

                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-gray-400 hover:text-white"
                                >
                                    <FiX />
                                </button>

                            </div>

                            <form
                                onSubmit={handleAddFood}
                                className="p-4 sm:p-5 space-y-4"
                            >
                                <div className="flex justify-center">
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleImage}
                                        />
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-2 border-dashed border-red-500/40 flex flex-col items-center justify-center overflow-hidden bg-white/5 hover:bg-white/10 transition-all">
                                            {
                                                previewImage ? (
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <>
                                                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-400/20 flex items-center justify-center mb-2">

                                                            <FiImage className="text-2xl text-red-400" />

                                                        </div>

                                                        <p className="text-[10px] sm:text-[11px] text-gray-400 text-center px-2 leading-4">
                                                            Upload Image
                                                        </p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium">
                                        Food Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={foodData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Butter Chicken"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl h-11 sm:h-12 px-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-red-500/50"
                                        required
                                    />
                                </div>

                                <div>

                                    <label className="block mb-2 text-sm font-medium">
                                        Description
                                    </label>

                                    <textarea
                                        rows="3"
                                        name="description"
                                        value={foodData.description}
                                        onChange={handleChange}
                                        placeholder="Short description..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-red-500/50 resize-none"
                                    />

                                </div>


                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Price (₹)
                                        </label>

                                        <input
                                            type="number"
                                            name="price"
                                            value={foodData.price}
                                            onChange={handleChange}
                                            placeholder="0"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl h-11 sm:h-12 px-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-red-500/50"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            Category
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="category"
                                                value={foodData.category}
                                                onChange={handleChange}
                                                required
                                                className="
                                                    appearance-none
                                                    w-full
                                                    bg-[#111827]
                                                    border
                                                    border-white/10
                                                    rounded-2xl
                                                    h-11
                                                    sm:h-12
                                                    px-4
                                                    pr-10
                                                    text-sm
                                                    text-white
                                                    outline-none
                                                    focus:border-red-500/50
                                                    cursor-pointer
                                                "
                                            >
                                                <option value="">
                                                    Select Category
                                                </option>
                                                <option value="Starter">
                                                    Starter
                                                </option>
                                                <option value="Main Course">
                                                    Main Course
                                                </option>
                                                <option value="Dessert">
                                                    Dessert
                                                </option>
                                                <option value="Beverages">
                                                    Beverages
                                                </option>
                                                <option value="Snacks">
                                                    Snacks
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                                    <div>
                                        <h3 className="font-medium text-sm">
                                            Available
                                        </h3>
                                        <p className="text-[11px] text-gray-400 mt-1">
                                            Show this item to customers
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFoodData((prev) => ({
                                                ...prev,
                                                isAvailable: !prev.isAvailable,
                                            }))
                                        }
                                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${foodData.isAvailable ? "bg-gradient-to-r from-red-500 to-orange-400" : "bg-white/10"}`}>
                                        <span className={` absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${foodData.isAvailable ? "left-7" : "left-1"}`}/>
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setOpenModal(false)}
                                        className="w-full sm:w-auto px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-orange-400 hover:opacity-90 transition-all px-4 py-2.5 rounded-2xl font-medium shadow-lg"
                                    >
                                        {editFoodId ? "Update Item" : "Add Item"}
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Foods;