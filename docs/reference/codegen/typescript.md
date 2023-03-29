---
id: codegen-typescript
title: Typescript
---

TypeScript is a strongly typed programming language that builds on JavaScript.

```base
concerto compile --model test.cto --target typescript
```

## Sample Output

```
/* eslint-disable @typescript-eslint/no-empty-interface */
// Generated code for namespace: test@1.0.0

// imports
import {IConcept} from './concerto@1.0.0';

// interfaces
export interface IPerson extends IConcept {
   email: string;
   dob?: Date;
}
```

## Options

None.

## Limitations

1. Scalars are unboxed as properties