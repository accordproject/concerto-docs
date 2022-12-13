---
id: model-metamodel
title: Metamodel JSON
sidebar_position: 8
---

Concerto models may be fully represented via the metamodel JSON format.

Given the following `test.cto` file:

```js
namespace test@1.0.0

concept Person identified by email {
  o String email
  o DateTime dob optional
}
```

It can be converted to metamodel JSON format via the command:

> Note: the `excludeLineLocations` argument removes the text stream positional information from the output JSON

```bash
parse --model test.cto --excludeLineLocations
```

Giving the output:

```json
{
    "$class": "concerto.metamodel@1.0.0.Model",
    "decorators": [],
    "namespace": "test@1.0.0",
    "imports": [],
    "declarations": [
        {
            "$class": "concerto.metamodel@1.0.0.ConceptDeclaration",
            "name": "Person",
            "isAbstract": false,
            "properties": [
                {
                    "$class": "concerto.metamodel@1.0.0.StringProperty",
                    "name": "email",
                    "isArray": false,
                    "isOptional": false
                },
                {
                    "$class": "concerto.metamodel@1.0.0.DateTimeProperty",
                    "name": "dob",
                    "isArray": false,
                    "isOptional": true
                }
            ],
            "identified": {
                "$class": "concerto.metamodel@1.0.0.IdentifiedBy",
                "name": "email"
            }
        }
    ]
}
```

The full reference to the Concerto metamodel is available [online](https://models.accordproject.org/concerto/metamodel@0.4.0.html).

