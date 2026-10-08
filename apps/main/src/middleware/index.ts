import { readFileSync } from "node:fs";
import { dirname, isAbsolute, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { MiddlewareHandler } from "astro";

const publicDir = resolve(join(dirname(fileURLToPath(import.meta.url)), "../../public"));

export const onRequest: MiddlewareHandler = async (context, next) => {
	if (!import.meta.env.DEV) return next();

	const { pathname } = context.url;
	const method = context.request.method;
	if (method !== "GET" && method !== "HEAD") return next();
	if (!pathname.startsWith("/") || pathname.includes(".")) return next();

	let decoded: string;
	try {
		decoded = decodeURIComponent(pathname);
	} catch {
		return next();
	}

	const candidates = [join(publicDir, decoded, "index.html"), join(publicDir, `${decoded}.html`)];

	for (const candidate of candidates) {
		const file = normalize(candidate);
		if (!isAbsolute(file) || !file.startsWith(publicDir + sep)) continue;
		let html: string | null = null;
		try {
			html = readFileSync(file, "utf8");
		} catch {
			continue;
		}
		return new Response(method === "GET" ? html : null, {
			status: 200,
			headers: { "content-type": "text/html; charset=utf-8" },
		});
	}

	return next();
};
