import z from "zod";
export const userSchema = z.object({
  name: z
    .string("name must be string")
    .trim()
    .min(2, "name should be atleast 2 char"),
  age: z.number("age must be a number").min(18, "age must be >= 18"),
  email: z.email("wrond email body"),
});


