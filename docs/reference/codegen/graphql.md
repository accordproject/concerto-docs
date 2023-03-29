---
id: codegen-graphql
title: GraphQL
---

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. 

```base
concerto compile --model test.cto --target graphql
```

## Sample Output

```
scalar DateTime
# namespace test@1.0.0
type Person {
   email: String!
   dob: DateTime
}
```

## Options

None.

## Limitations

1. `$` is unfortunately a restricted character in GraphQL!
2. Scalars are unboxed as properties
