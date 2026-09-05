import z from "zod";

export function validateBody(schema) {
  return (req, res, next) => {
    const body = req.body;
    const result = schema.safeParse(body);

    if (result.success) {
      next();
    } else {
      return res.status(422).json({
        error: z.treeifyError(result.error).properties,
      });
    }
  };
}

export function validateSearch(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (result.success) {
      next();
    } else {
      return res.status(422).json({
        error: z.treeifyError(result.error).properties,
      });
    }
  };
}

export function validatePath(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);
    if (result.success) {
      next();
    } else {
      return res.status(422).json({
        error: z.treeifyError(result.error).properties,
      });
    }
  };
}
