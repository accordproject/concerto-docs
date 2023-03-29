---
id: codegen-jsonschema
title: JSON Schema
---

JSON Schema is a declarative language that allows you to annotate and validate JSON documents.

```base
concerto compile --model test.cto --target jsonschema
```

## Sample Output

```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "test@1.0.0.Person": {
      "title": "Person",
      "description": "An instance of test@1.0.0.Person",
      "type": "object",
      "properties": {
        "$class": {
          "type": "string",
          "default": "test@1.0.0.Person",
          "pattern": "^test@1\\.0\\.0\\.Person$",
          "description": "The class identifier for this type"
        },
        "email": {
          "type": "string",
          "description": "The instance identifier for this type"
        },
        "dob": {
          "format": "date-time",
          "type": "string"
        }
      },
      "required": [
        "$class",
        "email"
      ]
    }
  }
}
```

## Options

None.

## Limitations

1. Scalars are unboxed as properties
