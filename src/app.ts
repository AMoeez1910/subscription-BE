import express from "express";
import { PORT } from "./config/env";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import subscriptionRouter from "./routes/subscription.routes";
import connectToDatabase from "./database/mongodb";
import errorMiddleware from "./middleware/error.midleware";
import cookieParser from "cookie-parser";

const app = express();
// Middleware to parse JSON
app.use(express.json());
// process formdata sent via html forms in simple format
app.use(express.urlencoded({ extended: false }));
// read cookies
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
