import express from "express"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import relationshipRoutes from "./routes/relationships.js"
const app = express()
import cookieParser from "cookie-parser"
import cors from "cors"
import { upload } from './routes/upload.js';


//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())



app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

//routes middlewares
app.use("/auth/api", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/relationships", relationshipRoutes);


//server listener
app.listen(8800, () => {
    console.log("Server is running on port 8800")
})