---
id: extending-metamodel
title: Metamodel Extensions
sidebar_position: 1
---

The Concerto metamodel defines the types of models that you can use Concerto to describe. The elements on the current metamodel are documented in the [design specification](../category/specification).

The Concerto metamodel is a _Goldilocks_ model, in as far as it offers _just enough_ features to describe real-world domain models, whilst remaining relatively easy to map to a wide variety of [code generation targets](../category/code-generation). 

Concerto is a **platform independent** modelling language. The Concerto metamodel will never support all the features of a platform specific model, such as OWL, XML Schema, JSON Schema, TypeScript or Rust. It's value is in being able to capture a useful subset (lowest common denominator) of a wide variety of metamodels and to provide a CLI and runtime APIs to work with models as data.

## Extending the Metamodel

Extensions to the Concerto metamodel _do occur_, but they are infrequent and are carefully considered, due to the extensive work involved in extending the complete Concerto stack to support new metamodel constructs. Backwards compatability is a major consideration.

Before undertaking an extension of the Concerto metamodel upstream impact must be considered. [Upstream tools that use Concerto](../tools/other-tools) (both Open Source and commercial) should be consulted. Early and clear communication via the Accord Project Technology Working Group is vital for success.

Metamodel changes that are fundamentally hard to map to the majority of supported code generation targets are unlikely to be approved, as are metamodel changes that undermine the ability for downstream tools to implement static analysis over Concerto models, or user interface generation.

> Note that the Concerto metamodel is itself a versioned Concerto model. It is deployed here: https://models.accordproject.org/concerto/metamodel@1.0.0.html

![Metamodel UML diagram](/img/metamodel.svg)
_Metamodel UML diagram_

For reference, here are some of the areas that must be updated when new features are added to the Concerto metamodel.

| Package   | Notes   |
|-----------|---------|
| concerto-metamodel | Publish the metamodel for runtime access. |
| https://models.accordproject.org | Publish the metamodel to the web. |
| concerto-cto | CTO grammar changes to create AST. Convert AST back to CTO. |
| concerto-core/introspect | Create runtime classes from AST and implement semantic validation, imports etc. |
| concerto-core/serializer | Serialize to/from JSON |
| concerto-core/Introspector | Update high-level introspection APIs |
| concerto-analysis | Implement change analysis |
| concerto-vocabulary | Generate Decorator Commands used for vocabulary terms |
| concerto-codegen | Update dependencies. Update all code generation targets |
| concerto-docs | Document metamodel changes, update code samples, code generation docs |
| concerto-cli | Update dependencies. |
| concerto-types | Update TypeScript types. |
