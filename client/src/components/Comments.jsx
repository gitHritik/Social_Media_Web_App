import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Comments = () => {
    const { currentUser } = useContext(AuthContext);

    // Temporary data
    const comments = [
        {
            id: 1,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem neque aspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem neque aspernatur ullam aperiam",
            name: "Loream 1",
            userId: 1,
            profilePicture:
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 2,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem neque aspernatur ullam aperiam",
            name: "Loream 2",
            userId: 2,
            profilePicture:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
    ];

    return (
        <div className="mt-4">
            {/* Write Comment */}
            <div className="flex items-center justify-between gap-5 my-5">
                <img
                    src={currentUser.profilePic}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <input
                    type="text"
                    placeholder="Write a comment"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 rounded-md outline-none"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">
                    Send
                </button>
            </div>

            {/* Render Comments */}
            {comments.map((comment) => (
                <div
                    key={comment.id}
                    className="flex justify-between gap-5 my-6"
                >
                    <img
                        src={comment.profilePicture}
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
