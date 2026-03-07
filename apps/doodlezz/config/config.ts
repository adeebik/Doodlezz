import dotenv from "dotenv";
dotenv.config();

export const BE_URL = process.env.BE_URL || "https://eraser-backend.onrender.com"
export const WS_URL = process.env.WS_URL || "https://eraser-ws.onrender.com"