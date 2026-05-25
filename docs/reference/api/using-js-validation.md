---
id: api-js-validation
title: Validating Data
---

# Validating JSON data against a Model

Concerto provides several ways to validate that a JSON document conforms to a
model. The recommended path — added in 4.x — is the `validateInstance` API
on `ModelManager` and `ClassDeclaration`. It wraps the existing
`Serializer.fromJSON` + `ResourceValidator` pipeline so you do not have to
assemble it by hand or use `try/catch` for control flow.

## The recommended API: `validateInstance`

Use this when you have a JSON object and want to know whether it conforms to a
model — and, if not, what's wrong.

```js
const { ModelManager } = require('@accordproject/concerto-core');

const mm = new ModelManager();
mm.addCTOModel(`namespace test@1.0.0

concept Driver {
  o String firstName
  o String lastName
  o String favoriteColor
}

concept Car identified by vin {
  o String vin
  o Driver owner
}`);

const data = {
  $class: 'test@1.0.0.Car',
  vin: 'abc123',
  owner: {
    $class: 'test@1.0.0.Driver',
    firstName: 'John',
    lastName: 'Doe',
    favoriteColor: 'Blue',
  },
};

const result = mm.validateInstance(data);

if (result.valid) {
  console.log('Valid! Resource:', result.resource.toString());
} else {
  for (const d of result.errors) {
    console.log(`[${d.code}] ${d.path}: ${d.message}`);
  }
}
```

`ModelManager#validateInstance` resolves the type from the JSON's `$class`
discriminator. If you already hold the expected `ClassDeclaration`, call it
directly — same signature, with the added benefit of also validating that the
input's `$class` is the expected type (or a subtype):

```js
const carDecl = mm.getType('test@1.0.0.Car');
const result = carDecl.validateInstance(data);
```

### The shape of the result

`validateInstance` returns a discriminated `ValidationResult`:

```ts
type ValidationResult =
  | { valid: true;  resource: Resource; warnings: Diagnostic[] }
  | { valid: false; resource: null;     errors: Diagnostic[]; warnings: Diagnostic[] };

type Diagnostic = {
  code: string;     // e.g. 'MISSING_REQUIRED_FIELD', 'TYPE_MISMATCH'
  message: string;  // human-readable; do not parse
  path: string;     // JSON Pointer to the offending value, e.g. '/owner/email'
  expected?: string;
  actual?: string;
  severity: 'error' | 'warning';
  cause?: Error;
};
```

Diagnostic codes are stable and machine-readable:

| Code | When |
|---|---|
| `TYPE_MISMATCH` | The JSON `$class` does not match the expected type (or any subtype) |
| `MISSING_CLASS` | The JSON object has no `$class` field |
| `UNKNOWN_TYPE` | The JSON `$class` is not registered in the ModelManager |
| `MISSING_REQUIRED_FIELD` | A non-optional field is absent |
| `UNDECLARED_FIELD` | The JSON has a property not declared on the model |
| `FIELD_TYPE_VIOLATION` | A field's value is of the wrong primitive type |
| `VALIDATOR_VIOLATION` | A field value fails its declared regex or range constraint |
| `INVALID_ENUM_VALUE` | A value is not a member of the declared enum |
| `INVALID_FIELD_ASSIGNMENT` | A nested object's type is not assignable to its field |
| `NOT_RELATIONSHIP` | A relationship slot holds something that is not a relationship |
| `INVALID_RELATIONSHIP` | A relationship points to a non-identifiable type |
| `ABSTRACT_CLASS` | The instance is declared as an abstract type |
| `EMPTY_IDENTIFIER` | An identified instance has an empty identifier |
| `DESERIALIZATION_ERROR` | The JSON could not be deserialised at all (see *Aggregation* below) |

### Aggregation

By default, **all** post-deserialization violations are collected. Pass
`{ collectAll: false }` for first-error semantics:

```js
const result = mm.validateInstance(data, { collectAll: false });
```

Aggregation is best-effort. The JSON populator runs first; if it rejects the
input outright (for example a number where a string field is expected, or
extra unknown properties), you get a single `DESERIALIZATION_ERROR`. Once
deserialization succeeds, all remaining violations (missing required fields,
regex or range violations, invalid enum values, abstract instantiation,
relationship type mismatches, etc.) are aggregated.

## Convenience forms

If you don't need the diagnostic list and prefer exceptions:

```js
try {
  const car = mm.validateInstanceOrThrow(data);
  // `car` is a fully-populated Resource ready to use
} catch (err) {
  // err is a ValidationException with err.diagnostics: Diagnostic[]
}
```

If you just want a boolean:

```js
if (mm.isValidInstance(data)) {
  // ...
}
```

Both are also available on `ClassDeclaration`.

## Generating a sample instance

`ClassDeclaration#generateSample` produces a JSON object that conforms to
the type — handy for tests, documentation, or seeding form values:

```js
const sample = carDecl.generateSample({ includeOptionalFields: true });
console.log(JSON.stringify(sample, null, 2));
```

Sample data round-trips: `decl.validateInstance(decl.generateSample()).valid`
is always `true`.

## Worked example: surfacing form errors

```js
function validateCarForm(json) {
  const result = mm.getType('test@1.0.0.Car').validateInstance(json);
  if (result.valid) {
    return { ok: true, car: result.resource };
  }
  // Group diagnostics by field path so the UI can render inline errors
  const byField = {};
  for (const d of result.errors) {
    (byField[d.path] ||= []).push(d.message);
  }
  return { ok: false, fieldErrors: byField };
}
```

## Lower-level alternative: `Serializer.fromJSON`

`Serializer.fromJSON` is still available and remains the underlying
primitive. It throws on the first violation and returns a populated
`Resource` on success:

```js
try {
  const resource = mm.getSerializer().fromJSON(data);
  resource.validate(); // re-runs the validator over the populated resource
  console.log('Valid');
} catch (err) {
  console.log(err.message);
}
```

Reach for the serializer directly only when you specifically need its
options (e.g. `convertResourcesToRelationships`, `deduplicateResources`)
that the higher-level API does not expose. For everyday "is this JSON valid
against this model?", prefer `validateInstance`.

## Introspecting the model

`ModelManager.getType` returns a `ClassDeclaration` you can introspect at
runtime:

```js
const decl = mm.getType('test@1.0.0.Car');
console.log(decl.getFullyQualifiedName());
decl.getProperties().forEach(p => {
  console.log(`- ${p.getName()} : ${p.getFullyQualifiedTypeName()}`);
});
```

These introspection APIs let you examine declared properties, super types,
and meta-properties for any modelled type.
