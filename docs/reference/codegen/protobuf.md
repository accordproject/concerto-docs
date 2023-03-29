---
id: codegen-protobuf
title: Protobuf
---

Protocol Buffers (Protobuf) is a free and open-source cross-platform data format used to serialize structured data.

```base
concerto compile --model test.cto --target protobuf
```

## Sample Output

```
syntax = "proto3";

package test.v1_0_0;

import "google/protobuf/timestamp.proto";

message Person {
  optional google.protobuf.Timestamp dob = 1;
  string email = 2;
}
```

## Options

None.

## Limitations

1. Scalars are unboxed as properties