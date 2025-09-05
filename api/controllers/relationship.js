import db from "../connection.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
    db.query(q, [req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship => relationship.followerUserId));
    });
}


export const addRelationship = (req, res) => {

    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("!Unauthorized");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token Is Not Valid");
        }

        const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?, ?)"

        db.query(q, [userInfo.id, req.body.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User Followed Successfully");
        })
    })
}

export const deleteRelationship = (req, res) => {

    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("!Unauthorized");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token Is Not Valid");
        }

        const q = "DELETE FROM relationships WHERE `followerUserId`=? AND `followedUserId`=?"

        db.query(q, [userInfo.id, req.query.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User Unfollowed Successfully");
        })
    })
}