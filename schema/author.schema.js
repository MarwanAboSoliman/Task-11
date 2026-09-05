import z from "zod";

export const authorSchema = z.object({
  name: z.string().trim().min(2, "Name Should be at Least 2 Characters"),
  age: z.number("Age Must Be a Number").min(18, "Age Must Be Greater Than 18"),
  books: z.array(z.string()).min(1, "Must Be Exist 1 book to be and Author"),
  biography: z
    .string()
    .trim()
    .max(500, "Biography should not exceed 500 characters")
    .optional(),
  genres: z.array(z.string()).optional(),
});

export const searchAuthorSchema = z.object({
  search: z.string().trim().min(2, "Name should be at least 2 char").optional(),
  authors_id: z.string("Id is stored String").optional(),
});

export const pathAuthorSchema = z.object({
  authors_id: z.coerce
    .number()
    .min(1, "Id is Between [1 - 1000]")
    .max(1000, "Id is Between [1 - 1000]"),
});
