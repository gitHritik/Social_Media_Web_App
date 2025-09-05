import db from './../connection.js';
import jwt from "jsonwebtoken"
import moment from 'moment';
export const getPosts = (req, res) => {
    const userId = req.query.userId;

    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json("!Unauthorized");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token Is Not Valid");
        const q = userId !== "undefined"
            ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
            : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =? ORDER BY p.createdAt DESC`;


        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];
        db.query(q, values, (err, data) => {
            if (err) return res.status(401).json(err);
            return res.status(200).json(data);
        })
    });



}
export const addPost = (req, res) => {

    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json("!Unauthorized");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token Is Not Valid");

        const q = "INSERT INTO posts(`desc`, `img`, `createdAT`, `userId`) VALUES (?)";
        const values = [req.body.desc, req.body.img, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), userInfo.id];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post Created Successfully");
        })
    });



}
export const deletePost = (req, res) => {

    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json("!Unauthorized");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token Is Not Valid");

        const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";
        const values = [req.params.id, userInfo.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows === 0) {
                return res.status(403).json("You can delete only your post");
            }
            return res.status(200).json("Post Deleted Successfully");
        })
    });



}