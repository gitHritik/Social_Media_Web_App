import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeRequest } from "../axios";
import { useQueryClient, useMutation } from '@tanstack/react-query';

const Update = ({ setOpen, user }) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState({
        email: user.email,
        password: user.password,
        name: user.name,
        city: user.city,
        website: user.website,
    });

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest().post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };


    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (user) => {
            return makeRequest().put("/users", user);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("[user]");
        },
    });

    const handleClick = async (e) => {
        e.preventDefault();

        //TODO: find a better way to get image URL

        let coverUrl;
        let profileUrl;
        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;

        mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
        setOpen(false);
        setCover(null);
        setProfile(null);

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
            <div className="relative w-[90%] md:w-[40%] h-[90%] md:h-[70%] bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 flex flex-col gap-5 overflow-y-auto">
                <h1 className="text-xl font-semibold text-gray-400">Update Your Profile</h1>

                <form className="flex flex-col gap-5">
                    {/* File Uploads */}
                    <div className="flex flex-wrap gap-10">
                        {/* Cover */}
                        <label htmlFor="cover" className="flex flex-col gap-2 text-sm text-gray-500">
                            <span>Cover Picture</span>
                            <div className="relative w-[100px] h-[100px]">
                                <img
                                    src={
                                        cover ? URL.createObjectURL(cover) : "/upload/" + user.coverPic
                                    }
                                    alt=""
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <CloudUploadIcon className="absolute inset-0 m-auto text-gray-400 cursor-pointer !text-[30px]" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            className="hidden"
                            onChange={(e) => setCover(e.target.files[0])}
                        />

                        {/* Profile */}
                        <label htmlFor="profile" className="flex flex-col gap-2 text-sm text-gray-500">
                            <span>Profile Picture</span>
                            <div className="relative w-[100px] h-[100px]">
                                <img
                                    src={
                                        profile
                                            ? URL.createObjectURL(profile)
                                            : "/upload/" + user.profilePic
                                    }
                                    alt=""
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <CloudUploadIcon className="absolute inset-0 m-auto text-gray-400 cursor-pointer !text-[30px]" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile"
                            className="hidden"
                            onChange={(e) => setProfile(e.target.files[0])}
                        />
                    </div>

                    {/* Form Fields */}
                    <label className="flex flex-col gap-1 text-sm text-gray-500">
                        Email
                        <input
                            type="text"
                            value={texts.email}
                            name="email"
                            onChange={handleChange}
                            className="border-b border-gray-300 bg-transparent p-1 text-gray-700 dark:text-gray-200 outline-none"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-500">
                        Password
                        <input
                            type="text"
                            value={texts.password}
                            name="password"
                            onChange={handleChange}
                            className="border-b border-gray-300 bg-transparent p-1 text-gray-700 dark:text-gray-200 outline-none"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-500">
                        Name
                        <input
                            type="text"
                            value={texts.name}
                            name="name"
                            onChange={handleChange}
                            className="border-b border-gray-300 bg-transparent p-1 text-gray-700 dark:text-gray-200 outline-none"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-500">
                        Country / City
                        <input
                            type="text"
                            name="city"
                            value={texts.city}
                            onChange={handleChange}
                            className="border-b border-gray-300 bg-transparent p-1 text-gray-700 dark:text-gray-200 outline-none"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm text-gray-500">
                        Website
                        <input
                            type="text"
                            name="website"
                            value={texts.website}
                            onChange={handleChange}
                            className="border-b border-gray-300 bg-transparent p-1 text-gray-700 dark:text-gray-200 outline-none"
                        />
                    </label>

                    {/* Update Button */}
                    <button
                        type="button"
                        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        onClick={handleClick}
                    >
                        Update
                    </button>
                </form>

                {/* Close Button */}
                <button
                    className="absolute top-3 right-5 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => setOpen(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Update;
