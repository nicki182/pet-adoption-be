import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors({ origin: `http//:localhost:${process.env.SERVER_PORT}` }));
app.use(express.json());
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
