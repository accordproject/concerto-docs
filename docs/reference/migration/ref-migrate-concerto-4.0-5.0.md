---
id: ref-migrate-concerto-4.0-5.0
title: Concerto 4.0 to 5.0
---

Concerto `5.0` is a major release that modernizes the internal module structure across the Concerto monorepo (`@accordproject/concerto-core`, `@accordproject/concerto-util`, `@accordproject/concerto-cto`, `@accordproject/concerto-vocabulary`, `@accordproject/concertino`, `@accordproject/concerto-analysis`, and `@accordproject/concerto-linter`).

This release converts internal modules from TypeScript's CommonJS-interop export syntax (`export = X`) to native ES module syntax (`export default X` / `export { X }`). This enables bundlers (webpack 5+, Vite, Rollup, esbuild) to tree-shake unused exports out of applications.

In addition, Concerto 5 promotes public exports for custom model analysis comparers, corrects TypeScript declaration hierarchies (`Declaration` vs `ClassDeclaration`), tightens metamodel AST typing, and removes legacy browser UMD bundles.

> View the [Concerto v5.0.0 release changelog](https://github.com/accordproject/concerto/releases) on GitHub. Thank you to all the contributors!

:::caution Breaking Changes
While standard public API imports (`import { ModelManager } from '@accordproject/concerto-core'`) remain compatible, this release contains breaking changes for deep imports into compiled package internals, legacy browser UMD bundles, declaration type hierarchies, and dual-package module resolution. Please read this guide carefully before upgrading.
:::

## Summary of Changes

Version 5.0 includes these major changes:

- **Native ES Module Exports** - Internal modules converted to native ESM (`export default` and `export { X }`), enabling import-level tree-shaking for bundlers.
- **Deep Imports Updated** - Deep imports into compiled internals (`.../dist/*`) now export an object rather than a bare constructor.
- **Browser UMD Bundles Removed** - Webpack-built UMD single-file bundles (`dist/concerto-core.js`) and the top-level `browser` field have been removed in favor of the dual-package `exports` map.
- **Public Comparer Exports** - `@accordproject/concerto-analysis` now exports `Comparer`, `ComparerFactory`, `CompareContext`, `CompareFinding`, and `CompareResults` from its package root.
- **Declaration Type Hierarchy Corrections** - Methods returning or inspecting declarations now accurately return `Declaration` instead of assuming `ClassDeclaration`.
- **AST Schema Typing** - `ModelManager.fromAst()` requires AST containers with metamodel `$class` discriminators (`IModels`).
- **Deep `types/` Tree Sealed** - Deep type imports into internal paths (`@accordproject/concerto-core/types/...`) are disallowed in favor of root `import type` exports.
- **Dual ESM Distribution** - Publishes separate Node (`dist/esm`) and browser (`dist/esm-browser`) ESM graphs via conditional exports.

## Am I Affected?

Most applications using standard root imports will be able to upgrade with minimal or no changes:

```typescript
// Standard root imports are UNAFFECTED:
import { ModelManager, Factory, Serializer } from '@accordproject/concerto-core';
import { Writer, FileWriter } from '@accordproject/concerto-util';
```

Run these diagnostic commands against your codebase to detect affected patterns:

```bash
# Check for CommonJS deep requires into compiled internals
grep -rn "require(['\"]@accordproject/concerto-[a-z-]*/dist/" .

# Check for ESM deep imports into compiled internals
grep -rn "from ['\"]@accordproject/concerto-[a-z-]*/dist/" .

# Check for deep imports into TypeScript declaration trees
grep -rn "from ['\"]@accordproject/concerto-[a-z-]*/types/" .
```

If these commands return no results, your project is likely ready to upgrade immediately.

## Breaking Changes

### Deep Imports of Class Modules

In 4.x, Concerto's TypeScript source used `export = X`, which compiled to `module.exports = X` in CommonJS. This allowed deep-importing individual classes directly.

In 5.0.0, internal modules use native ESM `export default X` and `export { X }`. When compiled to CommonJS, this emits `{ default: X, X }`.

#### CommonJS Deep Requires

**Before (4.x):**
```javascript
const Writer = require('@accordproject/concerto-util/dist/writer');
const writer = new Writer();
```

**After (5.0.0):**
Calling `new (require('.../dist/writer'))()` throws `TypeError: Writer is not a constructor`.

Fix by importing from the package root (recommended), destructuring the named export, or accessing `.default`:

```javascript
// Recommended: import from package root
const { Writer } = require('@accordproject/concerto-util');
const writer = new Writer();

// Or destructure the deep import:
const { Writer } = require('@accordproject/concerto-util/dist/writer');

// Or access .default:
const Writer = require('@accordproject/concerto-util/dist/writer').default;
```

#### ESM Deep Imports

**Before (4.x):**
```javascript
import Writer from '@accordproject/concerto-util/dist/writer';
const writer = new Writer();
```

**After (5.0.0):**
The `./dist/*` subpath resolves to the CommonJS output. When an ESM importer loads a CommonJS file, the default import binds to `module.exports` (the `{ default: Writer, Writer }` object).

Fix by switching to a root import or using a named import:

```javascript
// Recommended: root import
import { Writer } from '@accordproject/concerto-util';

// Or named deep import:
import { Writer } from '@accordproject/concerto-util/dist/writer';
```

### Removal of Browser UMD Bundles

In 4.x, `@accordproject/concerto-core`, `@accordproject/concerto-util`, and `@accordproject/concerto-cto` published standalone UMD bundles (`dist/concerto-*.js`) that registered globals on `window['concerto-core']`.

In 5.0.0, these UMD bundles and the top-level `browser` field in `package.json` have been removed:

- **Modern Bundlers (webpack 5+, Vite, Rollup, esbuild):** Unaffected. These tools resolve the `browser` condition in the package `exports` map, which directs to `dist/esm-browser/index.mjs`.
- **`<script>` Tag Users without a Bundler:** The global `window['concerto-core']` is gone. You should either:
  1. Add a bundler (Vite, esbuild, webpack) to your build pipeline.
  2. Use `<script type="module">` with an import map to resolve bare module specifiers (`@accordproject/concerto-core`, `@accordproject/concerto-cto`, `@accordproject/concerto-util`).
- **Legacy Bundlers (webpack 4, Parcel 1):** Tools that do not support package `exports` will fall back to `main` (the Node CommonJS build containing `fs` and `path` calls). Upgrading your bundler is required.

### Dual-Package Hazard (Mixing ESM and CommonJS)

Concerto 5 ships both native ESM (`dist/esm/index.mjs`) and CommonJS (`dist/index.js`).

If a single Node.js process loads Concerto via both `import` and `require` (for example, if your application uses ESM but a dependency uses `require('@accordproject/concerto-core')`), Node loads two distinct instances of the module.

While data structures are mostly duck-typed, internal `instanceof` checks (such as in `Serializer.toJSON()` and `Factory`) will fail across instances:

```javascript
import { ModelManager, Factory } from '@accordproject/concerto-core';
const concertoCjs = require('@accordproject/concerto-core');

ModelManager === concertoCjs.ModelManager; // false in 5.0.0
```

**Recommendations:**
1. Use consistent import styles within your application.
2. If using third-party packages that depend on Concerto, check `npm ls @accordproject/concerto-core` to ensure multiple major versions or duplicate copies are not being loaded.
3. If necessary, use package manager `overrides` (npm) or `resolutions` (yarn/pnpm) to align transitive dependencies to Concerto 5.

### Declaration Type Hierarchy & Property Guarding

In previous versions, several introspection methods typed their results as `ClassDeclaration`, even though models can contain other declaration types (such as `ScalarDeclaration`, `MapDeclaration`, and `EnumDeclaration`).

In Concerto 5:
- `ModelFile.getAllDeclarations()` and `ModelFile.getLocalType()` return `Declaration[]` and `Declaration`.
- `Comparer.compareClassDeclaration` in `@accordproject/concerto-analysis` receives `Declaration`, not `ClassDeclaration`.

Non-class declarations do not have `properties`. If your code accesses `properties` or `getOwnProperties()` while iterating declarations, you must now narrow the type first:

**Before (4.x):**
```typescript
const declarations = modelFile.getAllDeclarations();
// Assumed all declarations have properties
const allProperties = declarations.flatMap(decl => decl.properties || []);
```

**After (5.0.0):**
```typescript
import { ClassDeclaration, Declaration } from '@accordproject/concerto-core';

const declarations: Declaration[] = modelFile.getAllDeclarations();

// Guard with instanceof ClassDeclaration
const allProperties = declarations.flatMap(decl =>
  decl instanceof ClassDeclaration ? decl.properties || [] : []
);
```

### Direct `types/` Tree Imports Removed

Importing TypeScript declaration files directly from internal paths (e.g. `@accordproject/concerto-core/types/lib/...`) is not supported and will fail under `node16`, `nodenext`, or `bundler` resolution.

Import types directly from the package root using `import type`:

```typescript
// Before (4.x):
import type { ClassDeclaration } from '@accordproject/concerto-core/types/lib/introspect/classdeclaration';

// After (5.0.0):
import type { ClassDeclaration, ModelFile, Property } from '@accordproject/concerto-core';
```

### Metamodel AST Container Schema (`ModelManager.fromAst`)

`ModelManager.prototype.fromAst()` in Concerto 5 expects an AST container structure conforming to `IModels` with the metamodel namespace `$class` discriminator:

```typescript
import { ModelManager } from '@accordproject/concerto-core';
import { MetaModelNamespace } from '@accordproject/concerto-metamodel';

const modelManager = new ModelManager();

// Ensure the container includes the metamodel $class discriminator:
modelManager.fromAst({
  $class: `${MetaModelNamespace}.Models`,
  models: metamodels,
});
```

### FileDownloader Type Parameters

`FileDownloader` in `@accordproject/concerto-util` now accepts an optional second generic type parameter: `FileDownloader<TFile, TSeed = TFile>`. This accounts for cases where seed inputs differ from downloaded files. Existing single-parameter usages (`FileDownloader<ModelFile>`) remain fully compatible.

### Error Handling in `writeModelsToFileSystem`

When attempting to write an AST-only `ModelFile` to disk that has no source CTO text, `ModelManager.writeModelsToFileSystem` now throws an explicit error indicating which namespace could not be written, rather than failing with an internal filesystem exception.

## New Features & Improvements

### Import-Level Tree-Shaking

Because modules are now exported using standard ESM syntax and declare side-effect metadata:
- `@accordproject/concerto-util` is fully marked with `"sideEffects": false`.
- `@accordproject/concerto-core` marks only dayjs registration side-effects.

Bundlers can eliminate unused classes and utilities when using root named imports:

| Import | 4.2.0 Bundle Size | 5.0.0 Bundle Size | Reduction |
| :--- | :--- | :--- | :--- |
| `{ Writer }` from `concerto-util` | 95.5 KB | **1.0 KB** | **−98.9%** |
| `{ SecurityException }` from `concerto-core` | 903.5 KB | **4.1 KB** | **−99.6%** |
| `{ ModelManager }` from `concerto-core` | 903.5 KB | **419.4 KB** | **−53.6%** |

*(Measured via `esbuild --bundle --minify --format=esm` targeting browser)*

### Public Comparer Exports in `@accordproject/concerto-analysis`

Applications extending model comparison rules with `CompareConfigBuilder.addComparerFactory` previously had to use deep imports to obtain types.

`@accordproject/concerto-analysis` now exports all comparer types directly from its root entrypoint:

```typescript
import {
  Compare,
  CompareConfig,
  CompareConfigBuilder,
  Comparer,
  ComparerFactory,
  CompareContext,
  CompareFinding,
  CompareResult,
  CompareResults,
  compareResultToString,
} from '@accordproject/concerto-analysis';

const customComparer: ComparerFactory = (context: CompareContext): Comparer => ({
  compareClassDeclaration: (a, b) => {
    if (a instanceof ClassDeclaration && b instanceof ClassDeclaration) {
      // Custom comparison logic
    }
  },
});

const config = new CompareConfigBuilder()
  .addComparerFactory(customComparer)
  .build();
```

### Dual ESM Distribution (Node vs Browser)

Concerto 5 packages include two specialized ESM builds:

| Build | Location | Node Builtins (`fs`, `path`) | Selected By |
| :--- | :--- | :--- | :--- |
| **Node ESM** | `dist/esm/index.mjs` | Native Node imports | `import` condition (Node.js runtime) |
| **Browser ESM** | `dist/esm-browser/index.mjs` | Stubbed inert modules | `browser` condition (Vite, webpack, etc.) |

Filesystem-dependent classes (like `FileWriter` or `ModelLoader`) are safely stubbed in browser environments while functioning normally in Node.js.

### Concertino 5

`@accordproject/concertino` has been updated to 5.0.0 in lockstep with the core packages. Its generated metadata now indicates `concertinoVersion: "5.0.0"`.

## Migration Checklist

Follow this checklist to upgrade your project to Concerto 5:

### 1. Update Dependencies

Update all `@accordproject` packages to `^5.0.0` in your `package.json`:

```json
{
  "dependencies": {
    "@accordproject/concerto-core": "^5.0.0",
    "@accordproject/concerto-cto": "^5.0.0",
    "@accordproject/concerto-util": "^5.0.0",
    "@accordproject/concerto-vocabulary": "^5.0.0",
    "@accordproject/concerto-analysis": "^5.0.0",
    "@accordproject/concertino": "^5.0.0"
  }
}
```

If using downstream tools that depend on Concerto peer dependencies, you can align them using `overrides` (npm) or `resolutions` (yarn):

```json
{
  "overrides": {
    "@accordproject/concerto-codegen": {
      "@accordproject/concerto-core": "$@accordproject/concerto-core",
      "@accordproject/concerto-util": "$@accordproject/concerto-util",
      "@accordproject/concerto-vocabulary": "$@accordproject/concerto-vocabulary"
    }
  }
}
```

### 2. Replace Deep Imports

- [ ] Replace any deep imports from `@accordproject/concerto-analysis/dist/comparer` or `compare-context` with root imports from `@accordproject/concerto-analysis`.
- [ ] Replace deep imports into `@accordproject/concerto-util/dist/*` or `@accordproject/concerto-core/dist/*` with root named imports.
- [ ] Replace internal `types/lib/...` imports with root `import type { ... }`.

### 3. Review Declaration Handling

- [ ] Check code that iterates over `modelFile.getAllDeclarations()`. If accessing `.properties`, verify that the element is an instance of `ClassDeclaration`:
  ```typescript
  if (decl instanceof ClassDeclaration) {
    // access decl.properties
  }
  ```
- [ ] If authoring custom comparers, update `compareClassDeclaration(a, b)` handlers to accept `Declaration` and guard class-specific method calls.

### 4. Review AST Loading

- [ ] If passing raw model arrays to `ModelManager.prototype.fromAst()`, wrap them in an `IModels` object with `$class: 'concerto.metamodel@1.0.0.Models'`.

### 5. Verify Build & Tests

- [ ] Run `npm run build` or your TypeScript compiler check.
- [ ] Run your test suite (`npm test`).
- [ ] If bundling for the web, verify that your production bundle sizes reflect the tree-shaking benefits.

## Getting Help

If you encounter issues during migration:

- **GitHub Issues**: [Report bugs or ask questions](https://github.com/accordproject/concerto/issues)
- **Discord**: Join the [Accord Project Discord](https://discord.com/invite/Zm99SKhhtA) community
- **Documentation**: Visit [concerto.accordproject.org](https://concerto.accordproject.org)

## License

Accord Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0). Accord Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0).
