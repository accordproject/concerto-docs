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
package main
import "time"
type Person struct {
   Concept
   Email string `json:"email"`
   Dob time.Time `json:"dob"`
}
```

## Options

None.

## Limitations

1. Go types do not have super-types, so the super-type is embedded
2. Scalars are unboxed as properties
