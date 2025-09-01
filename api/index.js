import express from "express"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
const app = express()
import cookieParser from "cookie-parser"
import cors from "cors"


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



//routes middlewares
app.use("/auth/api", authRoutes);
app.use("/post/api", postRoutes);
app.use("/like/api", likeRoutes);
app.use("/comment/api", commentRoutes);
app.use("/users/api", userRoutes);







//server listener
app.listen(8800, () => {
    console.log("Server is running on port 8800")
})