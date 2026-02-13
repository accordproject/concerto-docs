---
id: codegen-rust
title: Rust
---

An open-source programming language supported by the Rust Foundation.

```base
concerto compile --model test.cto --target rust
```

## Sample Output

```
use serde::{ Deserialize, Serialize };
use chrono::{ DateTime, TimeZone, Utc };
   
use crate::concerto_1_0_0::*;
use crate::utils::*;
   
#[derive(Debug, Serialize, Deserialize)]
pub struct Person {
   #[serde(
      rename = "$class",
   )]
   pub _class: String,
   
   #[serde(
      rename = "email",
   )]
   pub email: String,
   
   #[serde(
      rename = "dob",
      skip_serializing_if = "Option::is_none",
      serialize_with = "serialize_datetime_option",
      deserialize_with = "deserialize_datetime_option",
   )]
   pub dob: Option<DateTime<Utc>>,
}
```

## Options

None.

## Limitations

1. Concerto references (e.g. `--> Organization shipper`) will need to be manually resolved in Rust, if the underlying `struct` needs to fully evaluated.
2. Rust code generation doesn't support length validation on String fields.
