# Rubem Neto's Portfolio

Welcome to my personal portfolio! This repository builds and serves multiple "versions" of the same website from one shared content source — the modern main site at `rubuy.me`, a chaotic 90s retro version at `rubuy.me/retro`, and room for more.

## 🚀 Features

- **One content source**: all personal info (bio, projects, contact, images) lives in `packages/content` and feeds every version — no copy-paste drift between versions.
- **Multiple versions**: `apps/main` (Astro + React + Tailwind, SSR on Vercel) and `apps/retro` (static, hand-crafted neocities-style) are mounted under one domain.
- **Dynamic Project Pages**: each version renders every project page from shared markdown articles.
- **Playground**: interactive projects (e.g. the pstr regex checker) backed by serverless endpoints in the hub.

## 📂 Project Structure

```plaintext
/
├── apps/
│   ├── main/               # the hub Astro site, serves rubuy.me/* and /api/*
│   └── retro/              # static retro version, mounted at rubuy.me/retro
├── packages/
│   └── content/            # single source of truth: profile.json, projects.json, *.md, shared assets
├── scripts/
│   └── mount.mjs           # copies apps/<version>/dist into apps/main/public/<version>
├── package.json            # npm workspaces + hub build orchestration
└── AGENTS.md               # how to add a new version
```

## 🛠️ Technologies Used

- **Astro** (per version app) with **Tailwind CSS** (main) and hand-written CSS (retro)
- **npm workspaces** monorepo
- **Vercel** (single deploy serves all versions)

## 📦 Installation

```bash
git clone https://github.com/rubuy-74/portifolio.git
cd portifolio
npm install
```

## 📄 Available Scripts

- `npm run dev`: main site on `http://localhost:4321` (also serves `/retro` after a build).
- `npm run dev:retro`: retro site on `http://localhost:4322`.
- `npm run build`: full hub chain — content → retro → mount → main.
- `npm run preview`: preview main's production build.

Deploy with `vercel` (project Root Directory: `apps/main`).

## 🌟 Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## 📧 Contact

If you have any questions or want to connect, feel free to reach out:

- **Email**: [rubemviscard2635@gmail.com](mailto:rubemviscard2635@gmail.com)
- **LinkedIn**: [linkedin.com/in/rubemneto74](https://www.linkedin.com/in/rubemneto74)

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
