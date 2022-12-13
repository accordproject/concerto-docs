---
id: model-namespaces
title: Namespaces
sidebar_position: 1
---

Each Concerto file (by convention with a `.cto` file extension) starts with the name and version of a single namespace. A Concerto namespace declares a set of *declarations*. A declaration is one of: enumeration, scalar, concept, asset, participant, transaction, event. 

All declarations within a single file belong to the same namespace.

> Note: The name of the Concerto file (or its file path) is irrelevant. What matters is the namespace within the file.

```js
namespace org.acme@1.0.0 // declares version 1.0.0 of the org.acme namespace

/**
 * This is a multiline code comment. Version 1.0.0 of
 * the org.acme namespace declares a single concept 'Address'.
 */
concept Address {
    o String street // 'String' is a primitive type
    o String city
    o String postCode optional // this is a single line code comment
    o String country
}
```