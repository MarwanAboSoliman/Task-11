import express from "express";
import { createDb } from "../db.js";
import { userSchema } from "../schema/user.schema.js";
import z from "zod";
import { validateBody } from "../middlewares/validateBody.middleware.js";
const db = createDb();

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  //Get All Users from db
  const users = await db.getAll("users");
  // Respond
  res.json({
    data: users,
  });
});

userRouter.get("/:user_id", async (req, res) => {
  // get user by id from database
  const user = await db.getById("users", req.params.user_id);
  //send as json
  res.json({
    data: user,
  });
});

userRouter.post("/", validateBody(userSchema), async (req, res) => {
  //Get Data from body
  const userData = req.body;

  //add To dataBase
  await db.create("users", userData);
  //Response
  res.status(201).json({
    message: "User Created Successfully",
  });
});

userRouter.patch(
  "/:user_id",
  validateBody(userSchema.partial()),
  async (req, res) => {
    //get Id from params
    const id = req.params.user_id;
    //check
    const user = await db.getById("users", id);
    if (!user) {
      return res.status(404).json({
        error: "User NOt Found",
      });
    }
    //get Data from body
    const updatedData = req.body;

    //Updated To DataBase
    await db.update("users", id, updatedData);
    const newUser = await db.getById("users", id);
    //respond
    res.status(200).json({
      message: "User Updated Successfully",
      data: newUser,
    });
    return res.status(422).json({
      error: z.treeifyError(result.error).properties,
    });
  },
);

userRouter.delete("/:user_id", async (req, res) => {
  const id = req.params.user_id;
  const user = await db.getById("users", id);
  if (user) {
    await db.delete("users", id);
    return res.status(200).json({
      message: "user Deleted ✅",
    });
  } else {
    return res.status(404).json({
      error: "User Not Found ❌",
    });
  }
});
