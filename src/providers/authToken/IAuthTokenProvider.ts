import { Pessoa } from "@modelTypes/pessoa";

export default interface IAuthTokenProvider {
  generateAuthToken(
    user: Pessoa,
    authSecret?: string,
    expiresAt?: number
  ): string;
  validateAuthToken(token: string, authSecret?: string): boolean;
}
