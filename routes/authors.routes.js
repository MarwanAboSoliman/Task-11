import express from "express";
import { createDb } from "../db.js";
import {
  authorSchema,
  pathAuthorSchema,
  searchAuthorSchema,
} from "../schema/author.schema.js";
import {
  validateBody,
  validatePath,
  validateSearch,
} from "../middlewares/validateBody.middleware.js";
const db = createDb();

export const authorRouter = express.Router();

//Search , GetAll
authorRouter.get("/", validateSearch(searchAuthorSchema), async (req, res) => {
  const search = req.query.search;
  let authors;
  if (search) {
    //If query Found Will Return The Specs Authour
    authors = await db.search("authors", search);
    if (authors.length === 0) {
      return res.status(404).json({
        error: "Not Found ",
      });
    } else {
      return res.status(200).json({
        data: authors,
      });
    }
  } else {
    // Will Get All Authour
    authors = await db.getAll("authors");
    return res.status(200).json({
      data: authors,
    });
  }
});

authorRouter.get(
  "/:authors_id",
  validatePath(pathAuthorSchema),
  async (req, res) => {
    //get authors from db
    const author = await db.getById("authors", req.params.authors_id);
    if (!author) {
      return res.status(404).json({
        error: "Author Not Found ❌",
      });
    }
    //respond
    res.json({
      data: author,
    });
  },
);

authorRouter.post("/", validateBody(authorSchema), async (req, res) => {
  //take Data from body
  const authData = req.body;
  //add to dataBase
  await db.create("authors", authData);
  //return Response
  res.status(201).json({
    message: "Author created Successfully ✅",
  });
});

authorRouter.patch(
  "/:authors_id",
  validateBody(authorSchema.partial()),
  async (req, res) => {
    //Check
    const id = req.params.authors_id;
    const auth = await db.getById("authors", id);
    if (!auth) {
      res.status(404).json({
        error: "Author not Found ❌",
      });
    } else {
      //get Data From Body
      const updatedData = req.body;
      //Updated Data in DataBase
      await db.update("authors", id, updatedData);
      const newAuth = await db.getById("authors", id);
      //Response
      return res.status(200).json({
        message: "Updated ✅",
        data: newAuth,
      });
    }
  },
);

authorRouter.delete("/:auth_id", async (req, res) => {
  const id = req.params.auth_id;
  const auth = await db.getById("authors", id);
  if (!auth) {
    return res.status(404).json({
      error: "Author Not Found ❌",
    });
  } else {
    await db.delete("authors", id);
    return res.status(204).json({
      message: "Deleted Successfully ✅",
    });
  }
});



