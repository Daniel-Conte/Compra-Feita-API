import { config } from "dotenv";
config();

export const authSecret = process.env.AUTH_SECRET as string;

export const tokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1; // 1 dia
