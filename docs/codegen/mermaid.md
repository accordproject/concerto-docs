---
id: codegen-mermaid
title: Mermaid
---

Mermaid lets you create diagrams and visualizations using text and code.

```base
concerto compile --model test.cto --target mermaid
```

## Sample Output

```
classDiagram
class Person {
<< concept>>
    +String email
    +DateTime dob
}

Person --|> Concept
```

## Options

None.

## Limitations

1. Scalars are unboxed as properties