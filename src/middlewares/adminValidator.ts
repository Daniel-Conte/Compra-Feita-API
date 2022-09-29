import { AuthTokenDecoded } from "@modelTypes/auth";
import { Request, Response } from "express";

const adminValidator = (req: Request, res: Response, next: any) => {
  const token = req.user as AuthTokenDecoded | undefined;

  if (!token) return res.status(401).send("Unauthorized");
  if (!token.admin) return res.status(401).send("Acesso restrito ao Admin");

  next();
};

export default adminValidator;
