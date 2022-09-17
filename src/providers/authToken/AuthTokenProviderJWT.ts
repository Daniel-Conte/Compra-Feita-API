import jwt from "jwt-simple";

import { Pessoa } from "@modelTypes/pessoa";
import { AuthTokenDecoded } from "@modelTypes/auth";
import IAuthTokenProvider from "./IAuthTokenProvider";

class AuthTokenProviderJWT implements IAuthTokenProvider {
  constructor(private authSecret: string, private expiresAt: number) {}

  generateAuthToken(
    user: Pessoa,
    authSecret = this.authSecret,
    expiresAt = this.expiresAt
  ): string {
    const payload: Record<string, any> = {
      ...user,
      iat: Date.now(),
      exp: expiresAt,
    };
    delete payload.senha;

    return jwt.encode(payload, authSecret);
  }

  validateAuthToken(token: string, authSecret = this.authSecret): boolean {
    try {
      const decoded: AuthTokenDecoded = jwt.decode(token, authSecret);

      if (new Date(decoded.exp) > new Date()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

export default AuthTokenProviderJWT;
