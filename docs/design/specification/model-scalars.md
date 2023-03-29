---
id: model-scalars
title: Scalars
sidebar_position: 3
---

Primitive types (String, Boolean, Integer, Long, Double, DateTime) may be declared and reused via a `scalar` declaration.

```
scalar <name> extends <primitive Concerto type> 
   <optional primitive Concerto type meta data>
```

Example:

```js
namespace org.acme.hr@1.0.0
scalar SSN extends String default="000-00-0000" regex=/\d{3}-\d{2}-\{4}+/

concept Person identified by ssn {
    o SSN ssn
    o String givenName
}
```

Scalars may be imported from external namespaces in a manner similar to other [imports](./model-imports.md).
