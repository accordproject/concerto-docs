---
id: model-namespaces
title: Namespaces
sidebar_position: 1
---

Each Concerto file starts with the name and version of a single namespace. A Concerto namespace declares a set of *declarations*. A declaration is one of: enumeration, concept, asset, participant, transaction, event. All declarations within a single file belong to the same namespace.

```js
namespace org.acme@1.0.0 // declares version 1.0.0 of the org.acme namespace
```
