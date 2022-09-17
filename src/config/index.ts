import { config } from "dotenv";
config();

export const authSecret = process.env.AUTH_SECRET as string;
