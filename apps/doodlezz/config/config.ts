let beUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BE_URL || "http://localhost:3002";
if (!beUrl.startsWith("http")) beUrl = `https://${beUrl}`;
export const BE_URL = beUrl;

let wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";
if (!wsUrl.startsWith("ws")) wsUrl = `wss://${wsUrl}`;
export const WS_URL = wsUrl;