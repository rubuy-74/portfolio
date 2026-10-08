import { cpSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const version = process.argv[2];

if (!version) {
	console.error("usage: node scripts/mount.mjs <version>");
	process.exit(1);
}

const source = join(root, "apps", version, "dist");
const target = join(root, "apps", "main", "public", version);

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });
console.log(`mounted apps/${version}/dist -> apps/main/public/${version}`);
