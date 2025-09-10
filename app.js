// extra sercurity packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import rateLimiter from "express-rate-limit";
// data security environment package
import "dotenv/config";
// error handler + middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/authentication.js";
// database connection
import connectDB from "./db/connect.js";
// routers
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
// express
import express from "express";

const app = express();
// go check the headers in network tab to see how security packages work

// in 15 mins, users only allow to make 100 requests
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: "Too many request for this IP, please try again after 15 minutes!",
});
app.use(limiter);
// app.use("/api", limiter) -> you can do this for other api

// is a middleware that parses incoming JSON payloads from HTTP requests and makes them available in req.body.
app.use(express.json());
// secure Express apps by setting HTTP response headers (hide credentials of response)
app.use(helmet());
// allow a website on 1 URL to request data from different URL
app.use(cors());
// Data sanitize against site script
app.use(xss());
// Data sanitize against NoSQL injection
app.use(mongoSanitize());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // app.listen() returns an http.Server
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
