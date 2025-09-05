/* eslint-disable no-unused-vars */
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import Comments from './Comments';
import { makeRequest } from "../axios.js";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from './../context/authContext';

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [deleteMenuOpen, setDeleteMenuOpen] = useState(false);
    const queryClient = useQueryClient();

    const { currentUser } = useContext(AuthContext);

    const { isPending, error, data } = useQuery({
        queryKey: ['likes', post.id],
        queryFn: () =>
            makeRequest().get(`/like?postId=${post.id}`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (liked) => {
            if (liked) return makeRequest().delete(`/like?postId=${post.id}`)
            return makeRequest().post("/like", { postId: post.id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries("[likes]");
        },
    });


    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id));
    }

    const deleteMutation = useMutation({
        mutationFn: (postId) => {
            return makeRequest().delete(`/posts/${postId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("[posts]");
        },
    });


    const handleDelete = () => {
        deleteMutation.mutate(post.id);
    };

    console.log(post)
    return (
        <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-900 dark:text-gray-100 p-5 mb-6">
            {/* User Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <img
                        src={`/uploads/${post?.profilePic}`}
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
                <MoreHorizIcon className="cursor-pointer" onClick={() => setDeleteMenuOpen(!deleteMenuOpen)} />
                {deleteMenuOpen && post.userId === currentUser.id && (
                    <button
                        className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg cursor-pointer hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="my-5">
                <p>{post.desc}</p>
                {post.img && (
                    <img
                        src={`/uploads/${post.img}`}
                        alt=""
                        className="w-full max-h-[500px] object-cover mt-5 rounded-lg"
                    />
                )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 cursor-pointer">
                    {isPending ? (
                        "loading"
                    ) : data.includes(currentUser.id) ? (
                        <FavoriteOutlinedIcon
                            style={{ color: "red" }}
                            onClick={handleLike}
                        />
                    ) : (
                        <FavoriteBorderOutlinedIcon onClick={handleLike} />
                    )}
                    <span>{data?.length} Likes</span>
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
            {commentOpen && <Comments postId={post.id} />}
        </div>
    );
};

export default Post;
