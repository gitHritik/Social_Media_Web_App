import Image from "../assets/img.png";
import Map from "../assets/map.png";
import Friend from "../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from './../axios.js';

const Share = () => {
    const { currentUser } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    const queryClient = useQueryClient();

    //file upload end point
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await makeRequest().post("/upload", formData)
            return response.data;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    };

    const mutation = useMutation({
        mutationFn: (newPost) => {
            return makeRequest().post("/posts", newPost);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("[posts]");
        },
    });

    const handleShare = async (e) => {
        // console.log("It is running handleShare");
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await uploadFile(file);
        mutation.mutate({ desc, img: imgUrl });
        setDesc("");
        setFile(null);
    };

    return (
        <div className="mb-5 rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg">
            <div className="p-5">
                {/* Top */}
                <div className="flex items-center gap-5">
                    <img
                        src={`/uploads/${currentUser.profilePic}`}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <input
                        type="text"
                        placeholder={`What's on your mind ${currentUser.name}?`}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="w-3/5 bg-transparent border-none outline-none py-5 px-2 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                    />
                </div>

                {/* Preview image */}
                {file && (
                    <div className="mt-3">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="w-full max-h-80 object-cover rounded-xl"
                        />
                    </div>
                )}

                <hr className="my-5 border-t border-gray-300 dark:border-gray-700" />

                {/* Bottom */}
                <div className="flex items-center justify-between">
                    {/* Left options */}
                    <div className="flex items-center gap-5">
                        <input
                            type="file"
                            id="file"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file" className="cursor-pointer">
                            <div className="flex items-center gap-2">
                                <img src={Image} alt="add" className="h-5" />
                                <span className="text-xs text-gray-500">Add Image</span>
                            </div>
                        </label>

                        <div className="flex items-center gap-2 cursor-pointer">
                            <img src={Map} alt="map" className="h-5" />
                            <span className="text-xs text-gray-500">Add Place</span>
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer">
                            <img src={Friend} alt="friend" className="h-5" />
                            <span className="text-xs text-gray-500">Tag Friends</span>
                        </div>
                    </div>

                    {/* Right share button */}
                    <div>
                        <button
                            onClick={handleShare}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                        >
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
