---
id: model-maps
title: Maps
sidebar_position: 3
---

A Map is a type which models data as key-value pairs. Conceptually, it relates closely to a Map type in Javascript or C#.


## Supported Keys

Primitives: String, DateTime\
Scalars: String, DateTime

## Supported Values

Primitives: String, DateTime, Integer, Long, Double, Boolean\
Scalars: String, Integer, Long, Double, Boolean\
Concepts: Identified & Non-Identified


```
map <name> {
    o <required Concerto type> 
    o <required Concerto type>
} 
```

Example:

```js
namespace org.acme.hr@1.0.0

map Rolodex  {
    o String
    o String
}
```

Types used in a map may be imported from external namespaces in a manner similar to other [imports](./model-imports.md).
