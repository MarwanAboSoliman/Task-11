import express from "express";
import { userRouter } from "./routes/users.routes.js";
import { authorRouter } from "./routes/authors.routes.js";
import fs from "fs/promises";
import { booksRouter } from "./routes/books.routes.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url);
  next();
});
app.use("/users", userRouter);

app.use("/authors", authorRouter); 

app.use("/books", booksRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "SomeThing Went Wrong" });
});
app.listen(3000, () => {
  console.log("Starts on port 3000");
});
