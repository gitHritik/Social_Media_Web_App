import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from './../axios';
import { useState } from "react";


const Comments = ({ postId }) => {
    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState("");
    const queryClient = useQueryClient();

    const { isPending, data } = useQuery({
        queryKey: ['comment'],
        queryFn: () =>
            makeRequest().get(`/comment?postId=${postId}`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (newComment) => {
            return makeRequest().post("/comment", newComment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("[comment]");
        },
    });

    const handleShare = async (e) => {
        // console.log("It is running handleShare");
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");

    };

    return (
        <div className="mt-4">
            {/* Write Comment */}
            <div className="flex items-center justify-between gap-5 my-5">
                <img
                    src={`/uploads/${currentUser.profilePic}`}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <input
                    type="text"
                    placeholder="Write a comment"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 rounded-md outline-none"
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer" onClick={handleShare}>
                    Send
                </button>
            </div>

            {/* Render Comments */}
            {isPending ? "loading..." : data.map((comment) => (
                <div
                    key={comment.id}
                    className="flex justify-between gap-5 my-6"
                >
                    <img
                        src={"/uploads/" + comment.profilePic}
                        alt={comment.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 flex flex-col gap-1 items-start">
                        <span className="font-medium">{comment.name}</span>
                        <p className="text-gray-700 dark:text-gray-300">{comment.desc}</p>
                    </div>
                    <span className="text-xs text-gray-500 self-center">
                        1 hour ago
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Comments;
