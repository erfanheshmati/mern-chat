import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // to parse the requests with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the requests with cookie values (from req.cookie)

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
