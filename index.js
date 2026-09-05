import express from "express";
import { userRouter } from "./routes/users.routes.js";
import { authorRouter } from "./routes/authors.routes.js";
import fs from "fs/promises";
import { booksRouter } from "./routes/books.routes.js";
import { createDb } from "./db.js";
const db = createDb();
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url);
  next();
});
app.use("/users", userRouter);

app.use("/authors", authorRouter);

app.use("/books", booksRouter);

app.use(async (err, req, res, next) => {
  await db.logError({
    time: new Date().toLocaleString("sv-SE"),
    method: req.method,
    url: req.url,
    message: err.message,
  });
  res.status(500).json({ error: "Something Went Wrong" });
});

app.listen(3000, () => {
  console.log("Starts on port 3000");
});
