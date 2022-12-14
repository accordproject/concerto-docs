---
id: codegen-plantuml
title: Plant UML
---

PlantUML is an open-source tool allowing users to create diagrams from a plain text language.

```base
concerto compile --model test.cto --target plantuml
```

## Sample Output

```
@startuml
title
Model
endtitle
class test.Person {
   + String email
   + DateTime dob
}
test.Person --|> concerto.Concept
@enduml
```

## Options

None.

## Limitations

1. Scalars are unboxed as properties