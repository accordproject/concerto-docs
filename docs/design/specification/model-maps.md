---
id: model-maps
title: Maps
sidebar_position: 9
---
A Map is a type which models data as key-value pairs. Conceptually, it relates closely to a Map type in Javascript or C#.

To enable this feature in Concerto 3.x , set an environment variable of `ENABLE_MAP_TYPE='true'` or provide `enableMapType` as an option to the `Concerto ModelManager`.

## Supported Key Types

- Primitives: String, DateTime
- Scalars: String, DateTime

## Supported Value Types

- Primitives: String, DateTime, Integer, Long, Double, Boolean
- Scalars: String, Integer, Long, Double, Boolean
- Concepts: Identified & Non-Identified

```
map <name> {
    o <required Concerto Key Type> 
    o <required Concerto Value Type>
} 
```

Example:

```js
namespace org.acme.hr@1.0.0

map Checklist {
  o String
  o Boolean
}
```

Types used in a Map may be imported from external namespaces in a manner similar to other [imports](./model-imports.md).

```js
namespace org.acme.hr@1.0.0 
import com.my.cool@1.0.0.Activity

map Timeline {
  o DateTime
  o Activity
}
```

---
