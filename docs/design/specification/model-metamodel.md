---
id: model-metamodel
title: Metamodel JSON
sidebar_position: 8
---

import ConcertoConverter from '@site/src/components/ConcertoConverter';

## What is a Metamodel?

A **metamodel** is the actual runtime object representation of your Concerto model. When you parse a CTO file, Concerto creates a metamodel object that captures the complete structure—namespaces, declarations, properties, and relationships.

This metamodel object can be represented in two formats:
- **CTO format**: The human-readable text format you write (e.g., `concept Person { o String name }`)
- **JSON format**: A structured JSON representation of the same model object

Both formats represent the same underlying model object. The JSON format is particularly useful when working with Concerto APIs programmatically, while CTO is easier for humans to read and write.

## Interactive Explorer

Explore how the same model object is represented in both CTO and JSON formats:

<ConcertoConverter />

## Converting with the CLI

Convert between CTO and JSON representations using the Concerto CLI:

**Parse CTO to JSON:**
```bash
concerto parse --model mymodel.cto --excludeLineLocations
```

**Convert JSON to CTO:**
```bash
concerto print --input mymodel.json
```

The `$class` property identifies each object's type. Properties include `isArray` and `isOptional` flags that correspond to the CTO syntax.

## Reference

For a complete definition of all metamodel classes and properties, see the [Concerto metamodel reference](https://github.com/accordproject/concerto-metamodel/blob/main/lib/metamodel.cto).

