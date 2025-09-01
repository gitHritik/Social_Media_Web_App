import db from './../connection.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = (req, res) => {

    // register logic

    //checking user exist or not
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).send(err);
        if (data.length) return res.status(409).send("User already exists");
        //inserting new user
        //hasing password

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (username, email, password,name) VALUES (?)";
        const values = [req.body.username, req.body.email, hash, req.body.name];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(201).send("User registered successfully");
        });
    });

}



export const login = (req, res) => {
    // login logic

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).send(err);
        if (!data.length) return res.status(404).send("User not found");

        //checking password
        const isValid = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isValid) return res.status(401).send("Invalid credentials");

        //distructure password from data
        const { password, ...others } = data[0];

        //creating jwt token
        const token = jwt.sign({ id: data[0].id }, "secretkey");
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others);

    });
}


export const logout = (req, res) => {
    // logout logic
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }).status(200).send("Logout successful");
}