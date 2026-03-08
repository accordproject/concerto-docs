# Concerto Documentation Website

This repository contains the documentation website for [Concerto](https://concerto.accordproject.org), a data modeling language and tools built by the [Accord Project](https://accordproject.org).

The website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Project Overview

Concerto is an open-source data modeling language that allows you to:
- Define data models using a simple, human-readable syntax
- Generate code in multiple languages (Java, TypeScript, Go, etc.)
- Validate data against models at runtime
- Import and export models from URLs

## Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [Yarn](https://yarnpkg.com/) v1.22.0 or higher

You can check your versions by running:
```
node --version
yarn --version
```

## Installation

Clone the repository and install dependencies:
```
$ git clone https://github.com/accordproject/concerto-docs.git
$ cd concerto-docs
$ yarn
```

## Local Development
```
$ yarn start
```

This command starts a local development server and opens up a browser window at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

## Project Structure
```
concerto-docs/
├── docs/               # Documentation markdown files
│   ├── design/         # Design specifications
│   ├── reference/      # API and CLI reference
│   ├── tutorials/      # Step-by-step tutorials
│   └── tools/          # Tools documentation
├── src/                # React components and pages
│   └── components/     # Custom React components
├── static/             # Static assets (images, etc.)
├── docusaurus.config.js # Docusaurus configuration
└── sidebars.js         # Sidebar navigation configuration
```

## Build
```
$ yarn build
```

This command generates static content hosting service.

## Deployment

Using SSH:
```
$ USE_SSH=true yarn deploy
```

Not using SSH:
```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Contribution Guidelines

We welcome contributions! To contribute:

1. Fork this repository
2. Create a new branch: `git checkout -b fix/your-fix-name`
3. Make your changes
4. Sign off your commits: `git commit --signoff -m "your message"`
5. Push to your fork: `git push origin fix/your-fix-name`
6. Open a Pull Request against the `main` branch

Please read the [contributing guidelines](https://github.com/accordproject/techdocs/blob/master/CONTRIBUTING.md) before submitting a PR.

## Troubleshooting

**Port already in use:**
```
$ yarn start --port 3001
```

**Dependency issues:**
```
$ rm -rf node_modules
$ yarn
```

**Build errors:** Make sure your Node.js version meets the prerequisites above.

## License

This project is licensed under the Apache 2.0 License. See [LICENSE](LICENSE) for details.
