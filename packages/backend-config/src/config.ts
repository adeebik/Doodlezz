import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";

function findRoot(dir: string): string {
  if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) {
    return dir;
  }
  const parent = path.dirname(dir);
  if (parent === dir) return dir;
  return findRoot(parent);
}

const rootDir = findRoot(process.cwd());
const envPath = path.join(rootDir, ".env");
if (fs.existsSync(envPath)) {
  console.log(`✅ Loading environment from: ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log(`⚠️  No .env found at: ${envPath}`);
}
// Also load from current directory if specifically provided
dotenv.config(); 

export const JWT_SECRET = process.env.JWT_SECRET
export const BE_URL = process.env.BE_URL
export const WS_URL = process.env.WS_URL
export const FE_URL= process.env.FE_URL