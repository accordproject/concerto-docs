---
id: concertolinter
title: Concerto Linter
sidebar_position: 6
---

A fully configurable linter for Concerto models that ensures best practices and high-quality standards before use. It runs models against a default ruleset, and you can customize it to fit your needs.

It can be used programmatically as a library via its `lintModel` API or interactively through a Command-Line Interface (CLI) command integrated into the `concerto-cli`.

## Programmatic Usage (`lintModel` API)

Install the package via npm:

```bash
npm install @accordproject/concerto-linter
```

The `lintModel` function accepts your model in two formats.

- Option 1 - CTO string

```javascript
import { lintModel } from "@accordproject/concerto-linter";

const model = `
namespace org.example

asset MyProduct {
  o String productId
}
`;

const results = await lintModel(model);
console.log(results);
```

- Option 2 - Parsed AST

```javascript
import { lintModel } from "@accordproject/concerto-linter";
import { ModelManager } from "@accordproject/concerto-core";

const modelManager = new ModelManager();
const ctoString = `
namespace org.example
asset MyProduct {
 o String productId
}`;
modelManager.addCTOModel(ctoString);

const ast = modelManager.getAst();
const results = await lintModel(ast);
console.log(results);
```

### Ruleset Configuration

You can control which Spectral rules are applied in several ways:

- **Default Ruleset** - if no custom configuration is present, the linter uses the built-in `@accordproject/concerto-linter-default-ruleset`.
- **Automatic discovery** - the linter searches for common Spectral configuration files in the project root: `.spectral.yaml`, `.spectral.yml`, `.spectral.json`, or `.spectral.js`.
- **Explicit path** - pass a path to a custom ruleset file:

```javascript
const results = await lintModel(model, {
  ruleset: "path/to/custom-ruleset.yaml",
});
```

- **Force default** - use the literal string `'default'` to force the built-in ruleset even if custom rulesets exist:

```javascript
const results = await lintModel(model, { ruleset: "default" });
```

For instructions on authoring custom rulesets see the _Configuration & Extensibility_ section of the documentation.

### Output format

`lintModel` returns a `Promise` that resolves to an array of lint result objects. Each item describes a single issue using a flat JSON structure.

```typescript
interface lintResult {
  /** Unique rule identifier (e.g. 'no-unused-concept') */
  code: string;

  /** Human-readable description of the violation */
  message: string;

  /** Severity level ('error' | 'warning' | 'info' | 'hint') */
  severity: string;

  /**
   * JSONPath-style pointer as an array of keys/indices (e.g. ['declarations', 3])
   */
  path: Array<string | number>;

  /** Namespace where the violation occurred (e.g. 'org.accordproject') */
  namespace?: string;
}
```

#### Example output

```json
[
  {
    "code": "camel-case-properties",
    "message": "Property 'FirstVal' should be camelCase (e.g. 'firstVal').",
    "severity": "warning",
    "path": ["declarations", 3],
    "namespace": "org.example.model"
  }
]
```

### Namespace filtering

By default the linter excludes results from internal namespaces (for example `concerto.*` and `org.accordproject.*`). You can override or extend these exclusions with the `excludeNamespaces` option:

```javascript
// override default exclusions
const results = await lintModel(ast, {
  excludeNamespaces: ["org.example.*", "com.acme.*"],
});

// combine a custom ruleset and namespace filtering
const results2 = await lintModel(ast, {
  ruleset: "D:\\linter-test\\my-ruleset.yaml",
  excludeNamespaces: ["org.example.*"],
});
```

## Default Ruleset

`@accordproject/concerto-linter-default-ruleset`

A comprehensive set of linting rules designed to validate concerto models against industry best practices and consistent naming conventions. It is fully configurable - you can extend it, add new rules, disable existing ones, or create an entirely new ruleset without extending this one.

This sub-package is part of the `@accordproject/concerto-linter` package.

### Available Rules

The following table provides an overview of the available linting rules in the default ruleset:

| Rule Id                         | Description                                                                                                                                                                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| namespace-version               | Ensures that the namespace declaration in the model includes a version number. This rule enforces semantic versioning in namespaces, promoting clarity and compatibility management.                                                                        |
| no-reserved-keywords            | Enforces that names used for declarations, properties, and decorators in concerto models do not use reserved keywords. Reserved keywords are language-specific terms that may cause conflicts or unexpected behavior if used as identifiers.                |
| pascal-case-declarations        | Ensures that declaration names (scalar, enum, concept, asset, participant, transaction, event) follow PascalCase naming convention (e.g., 'MyDeclaration'). This promotes consistency and readability across model declarations.                            |
| camel-case-properties           | Ensures that properties of type String, Double, Integer, Long, DateTime, and Boolean are named using camelCase. This promotes consistency and readability in property naming conventions across the model.                                                  |
| upper-snake-case-enum-constants | Enforces that all enum constant names follow the UPPER_SNAKE_CASE convention. This rule checks each enum property name and reports an error if it does not match the required pattern. Ensures consistency and readability in enum naming across the model. |
| pascal-case-decorators          | Ensures that decorator names follow PascalCase naming convention (e.g., 'MyDecorator'). This promotes consistency and readability across model decorators.                                                                                                  |
| string-length-validator         | Ensures that all string properties within the data model have a length validator applied, which helps prevent inconsistent data length and ensure proper storage.                                                                                           |
| no-empty-declarations           | Detects and reports any model declarations that are empty. This rule helps maintain model integrity by ensuring that all declarations contain meaningful content, preventing the inclusion of unused or placeholder declarations in the model.              |
| abstract-must-subclassed        | Ensures that every abstract declaration in the model has at least one concrete subclass. This helps prevent unused or orphaned abstract types, enforcing better model design.                                                                               |

First, install the package as a development dependency:

```bash
npm install --save-dev @accordproject/concerto-linter-default-ruleset
```

Once installed, the default ruleset is automatically used by the concerto Linter when no custom ruleset is specified.

```javascript
import { lintModel } from "@accordproject/concerto-linter";

// The default ruleset will be used automatically
const results = await lintModel(modelText);
console.log(results);
```

To explicitly specify the default ruleset:

```javascript
const results = await lintModel(modelText, { ruleset: "default" });
```

## Customization

To create your own ruleset that fits your project needs, you can either extend the default ruleset, or create an entirely new ruleset from scratch.

Your ruleset can be defined in multiple file formats (YAML, JSON, JavaScript). Below we show YAML examples only; other formats are supported but not shown here.

### Extending the Default Ruleset

You can extend the default ruleset. Rulesets can be authored in multiple formats; the YAML form is shown here.

**YAML (.spectral.yaml)**

```yaml
extends: "@accordproject/concerto-linter-default-ruleset"
```

### Disabling Specific Rules

You can disable specific rules that don't match your project's requirements by setting them to `'off'`. The rule identifiers are defined in the `ruleset-main.ts` file located at `concerto/packages/concerto-linter/default-ruleset/src`.

#### Available Rule IDs

| Rule ID                           | Description                                       |
| --------------------------------- | ------------------------------------------------- |
| `namespace-version`               | Ensures namespaces include version numbers        |
| `no-reserved-keywords`            | Prevents use of reserved keywords                 |
| `pascal-case-declarations`        | Enforces PascalCase for declarations              |
| `camel-case-properties`           | Enforces camelCase for properties                 |
| `upper-snake-case-enum-constants` | Enforces UPPER_SNAKE_CASE for enum constants      |
| `pascal-case-decorators`          | Enforces PascalCase for decorators                |
| `string-length-validator`         | Requires string length validators                 |
| `no-empty-declarations`           | Prevents empty declarations                       |
| `abstract-must-subclassed`        | Ensures abstract classes have concrete subclasses |

You can express this configuration in YAML:

**YAML (.spectral.yaml)**

```yaml
extends: "@accordproject/concerto-linter-default-ruleset"
rules:
  pascal-case-declarations: "off"
  camel-case-properties: "off"
```

### Enabling Specific Rules

You can selectively start with everything off and enable only specific rules :

**YAML (.spectral.yaml)**

```yaml
extends: [["@accordproject/concerto-linter-default-ruleset", "off"]]
rules:
  pascal-case-declarations: true
  namespace-version: true
```

---

### Adjusting Rule Severity

You can customize the severity level of each rule to control how violations are reported. Use textual levels (`error`, `warn`, `info`, `hint`) or numeric levels according to your project's conventions.

- **error** = must be fixed
- **warn** = should be addressed
- **info** = useful information
- **hint** = optional suggestion

Below is a YAML example showing severity overrides :

**YAML (.spectral.yaml)**

```yaml
extends: "@accordproject/concerto-linter-default-ruleset"
rules:
  pascal-case-declarations: "warn" # Change from error to warning
  camel-case-properties: "info" # Change to informational
```

## Creating Custom Rules

Whether you want to add new rules to the default ruleset or create an entirely new ruleset, you can follow the Spectral ruleset format. For comprehensive documentation, see the [Spectral ruleset documentation](https://meta.stoplight.io/docs/spectral/e5b9616d6d50c-rulesets).

Here's a simple example of what a custom rule looks like (YAML):

```yaml
# description (optional): Explains what the ruleset is about.
description: "Declaration names (scalar, enum, concept, asset, participant, transaction, event) should be PascalCase."

# given (required): JSONPath expression that specifies where the rule applies.
given: "$.models[*].declarations[*].name"

# message (required): The error/warning message shown when the rule is violated.
message: "Declaration '{{value}}' should be PascalCase (e.g. 'MyDeclaration')"

# severity (optional): The level of violation.
# 0 = error, 1 = warning, 2 = info, 3 = hint
severity: 0

# then (required): Defines what function to apply and how.
then:
  # function (required): The function that validates the rule.
  function: casing

  # functionOptions (optional): Extra options for the function.
  functionOptions:
    type: pascal
```

For more complex rules, you can create custom JavaScript functions following [Spectral ruleset documentation](https://meta.stoplight.io/docs/spectral/e5b9616d6d50c-rulesets) and import them into your rule, similar to how the built-in rules work.✅
