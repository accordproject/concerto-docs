---
id: model-metamodel
title: Metamodel JSON
sidebar_position: 8
---

import ConcertoConverter from '@site/src/components/ConcertoConverter';

## What is a Metamodel?

The **Concerto metamodel** is the schema that defines the structure of all valid Concerto models. It describes the types and relationships that can be used to build domain models.

When you parse a CTO file, Concerto creates an **AST (Abstract Syntax Tree)**, also known as a **metamodel instance**. This is a runtime object representation that is an instance of the metamodel—it captures the complete structure of your specific model including namespaces, declarations, properties, and relationships.

This AST/metamodel instance can be represented in two formats:
- **CTO format**: The human-readable text format you write (e.g., `concept Person { o String name }`)
- **JSON format**: A structured JSON representation of the same AST/metamodel instance

Both formats represent the same underlying model instance. The JSON format is particularly useful when working with Concerto APIs programmatically, while CTO is easier for humans to read and write.

## Interactive Explorer

Explore how the same AST/metamodel instance is represented in both CTO and JSON formats:

<ConcertoConverter />

## Converting with the CLI

Convert between CTO and JSON representations of your AST/metamodel instance using the Concerto CLI:

**Parse CTO to JSON (creates an AST/metamodel instance):**
```bash
concerto parse --model mymodel.cto --excludeLineLocations
```

**Convert JSON to CTO (creates CTO from an AST/metamodel instance):**
```bash
concerto print --input mymodel.json
```

The `$class` property identifies each object's type within the AST. Properties include `isArray` and `isOptional` flags that correspond to the CTO syntax.

## Reference

For a complete definition of all metamodel classes and properties, see the [Concerto metamodel reference](https://github.com/accordproject/concerto-metamodel/blob/main/lib/metamodel.cto).

