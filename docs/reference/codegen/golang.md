---
id: codegen-golang
title: Go
---

An open-source programming language supported by Google.

```base
concerto compile --model test.cto --target golang
```

## Sample Output

```
// Package test_1_0_0 contains domain objects and was generated from Concerto namespace test@1.0.0.
package test_1_0_0
import "time"
import "concerto_1_0_0";
   
type Person struct {
   concerto_1_0_0.Concept
   Email string `json:"email"`
   Dob time.Time `json:"dob"`
}
```

## Options

None.

## Limitations

1. Go types do not have super-types, so the super-type is embedded
2. Scalars are unboxed as properties
