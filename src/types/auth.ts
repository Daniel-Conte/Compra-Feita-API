import { Pessoa } from "./pessoa";

export type LoginDTO = {
  email: string;
  senha: string;
};

export type AuthTokenDecoded = Omit<Pessoa, "senha"> & {
  iat: number;
  exp: number;
};
