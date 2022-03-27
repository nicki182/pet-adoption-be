import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
