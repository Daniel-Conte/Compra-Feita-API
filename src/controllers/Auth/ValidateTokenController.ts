import { NextFunction, Request, Response } from "express";

import type IAuthTokenProvider from "@providers/authToken/IAuthTokenProvider";

class ValidateTokenController {
  constructor(private authTokenProvider: IAuthTokenProvider) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization as string;

      if (token) token = token.replace("Bearer ", "");

      const passed = await this.exec(token);

      return res.status(passed ? 200 : 401).send();
    } catch (error) {
      next(error);
    }
  }

  async exec(token: string) {
    if (!token) throw new Error("Token é obrigatório");

    return this.authTokenProvider.validateAuthToken(token);
  }
}

export default ValidateTokenController;
