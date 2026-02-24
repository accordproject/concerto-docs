
# Accord Project Website

Official documentation website for the Accord Project built using Docusaurus v2.

This repository contains the source code for the documentation website, including guides, references, blogs, and community resources.

---

## 📖 About the Project

The Accord Project is an open-source initiative focused on smart legal contracts and open standards for computational law.

This website:

* Hosts official documentation
* Provides onboarding guides
* Publishes blog posts
* Serves as the primary learning resource for contributors

---

# 🚀 Getting Started

## ✅ Prerequisites

Make sure you have:

* **Node.js** ≥ 18.x
* **Yarn** ≥ 1.22.x (or Yarn Classic if required)
* **Git**

Check versions:

```bash
node -v
yarn -v
```

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/<org>/<repo>.git

# 2. Navigate into the project directory
cd website

# 3. Install dependencies
yarn install
```

---

# 💻 Local Development

Start the development server:

```bash
yarn start
```

This will:

* Launch a local server (usually at [http://localhost:3000](http://localhost:3000))
* Enable hot reload (changes reflect instantly)
* Open the browser automatically

### Run on a different port

```bash
yarn start --port 3001
```

---

# 🏗️ Project Structure

```
website/
│
├── docs/                 # Documentation markdown files
├── blog/                 # Blog posts
├── src/                  # React components and custom pages
├── static/               # Static assets (images, files)
├── docusaurus.config.js  # Site configuration
└── sidebars.js           # Docs sidebar structure
```

### Folder Explanation

* **docs/** → Main documentation content
* **blog/** → Blog articles
* **src/** → Custom React components & theme overrides
* **static/** → Images, logos, downloadable files
* **docusaurus.config.js** → Site metadata, navbar, footer, plugins

---

# 🏗️ Build

Generate production build:

```bash
yarn build
```

This creates optimized static files in:

```
/build
```

These files can be deployed using any static hosting provider.

---

# 🚀 Deployment

If using GitHub Pages:

### Using SSH

```bash
USE_SSH=true yarn deploy
```

### Using HTTPS

```bash
GIT_USER=<your-github-username> yarn deploy
```

This command:

* Builds the site
* Pushes to the `gh-pages` branch
* Updates the hosted website

---

# 🤝 Contributing

We welcome contributions from the community!

## How to Contribute

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes
4. Commit with a clear message

```bash
git commit -m "docs: improve installation section clarity"
```

5. Push to your fork
6. Open a Pull Request

---

## 📌 Contribution Guidelines

* Follow consistent Markdown formatting
* Use clear headings
* Keep documentation concise
* Add examples where helpful
* Verify links before submitting

If available, please refer to:

* `CONTRIBUTING.md`
* `CODE_OF_CONDUCT.md`

---

# 🐛 Troubleshooting

### Port already in use

Kill the process:

```bash
lsof -i :3000
```

Or change port:

```bash
yarn start --port 3001
```

---

### Dependency Issues

```bash
rm -rf node_modules
yarn install
```

---

### Clear Docusaurus Cache

```bash
yarn clear
```

---

# 🧪 Writing & Documentation Standards

* Use meaningful headings
* Prefer active voice
* Keep sentences short
* Add code examples when relevant
* Maintain consistent formatting

---

# 🌍 Versioning & Internationalization

If versioning or i18n is enabled:

* Docs versions are managed via Docusaurus versioning system
* Translation files are located in `/i18n` directory

Refer to Docusaurus documentation for advanced configuration.

---

# 🛠️ Tech Stack

* Docusaurus 2
* React
* Markdown (MDX)
* Node.js
* GitHub Pages

---

# 👋 First-Time Contributors

Look for issues labeled:

* `good first issue`
* `documentation`
* `help wanted`

These are ideal starting points for new contributors.

---

# 📜 License

This project is licensed under the terms specified in the `LICENSE` file.

---

# ❤️ Community

Join discussions, report issues, and help improve the documentation.

We appreciate all contributions — from typo fixes to major improvements.

---
