import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import Comments from './Comments';

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false);

    // TEMPORARY
    const liked = false;

    return (
        <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-900 dark:text-gray-100 p-5 mb-6">
            {/* User Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <img
                        src={post.profilePic}
                        alt={post.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <Link
                            to={`/profile/${post.userId}`}
                            className="no-underline text-inherit"
                        >
                            <span className="font-medium">{post.name}</span>
                        </Link>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            1 min ago
                        </span>
                    </div>
                </div>
                <MoreHorizIcon className="cursor-pointer" />
            </div>

            {/* Content */}
            <div className="my-5">
                <p>{post.desc}</p>
                {post.img && (
                    <img
                        src={post.img}
                        alt=""
                        className="w-full max-h-[500px] object-cover mt-5 rounded-lg"
                    />
                )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 cursor-pointer">
                    {liked ? (
                        <FavoriteOutlinedIcon className="text-red-500" />
                    ) : (
                        <FavoriteBorderOutlinedIcon />
                    )}
                    <span>12 Likes</span>
                </div>

                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setCommentOpen(!commentOpen)}
                >
                    <TextsmsOutlinedIcon />
                    <span>12 Comments</span>
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                    <ShareOutlinedIcon />
                    <span>Share</span>
                </div>
            </div>

            {/* Comments Section */}
            {commentOpen && <Comments />}
        </div>
    );
};

export default Post;
