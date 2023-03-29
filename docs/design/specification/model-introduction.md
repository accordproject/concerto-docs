---
id: model-introduction
title: Introduction
sidebar_position: 0
---

Concerto models may be specified using either a [JSON document](./model-metamodel.md), or using a set of domain-specific language files (the `CTO` format).

Concerto can convert seamlessly between these two formats. Use the `concerto parse` command to convert a CTO string to a JSON model, or the `concerto print` CLI command to convert a JSON model to a CTO string.

## Data Serialization and Deserialization

Concerto includes a runtime library to serialize data to/from JSON and to validate that JSON data conforms to the data model.

JSON data includes basic type information and field names — allowing any JSON library to be used to deserialize the data. To validate that the data conforms to a Concerto data model the reader should have access to the Concerto data model (JSON or CTO) as well as a Concerto runtime.

### Objects

In general the JSON serialization will take the form of a JSON object, with nested objects. 

```json
{
  "$class" : "org.acme@1.0.0.Person",
  "name" : "John Doe",
  "address" : {
    "$class" : "org.acme@1.0.0.Address",
    "street" : "1 Main Street"
  }
}
```

Corresponding data model:

```js
namespace org.acme@1.0.0

concept Address {
  o String street
}

concept Person {
  o String name
  o Address adress
}
```

Note that Concerto uses a [nominal type system](https://en.wikipedia.org/wiki/Nominal_type_system) with the type identifiers carried via the `$class` JSON property.

### Enums

An enum is encoded by their string value.

### Arrays

Arrays are encoded by a JSON array.

###  Null Values

Null values are encoded using a JSON `null`.

### DateTime Values

DateTime values are encoded as a JSON string is ISO-8601 format.

### Integer, Long, Double Values

Integer, Long, Double values are encoded as JSON numbers.

### Boolean Values

Boolean values are encoded as JSON Booleans (`true` / `false`).

### String Values

String values are encoded as JSON strings.

### Relationship Values

[Relationship values](./model-relationships.md) are encoded as JSON strings, using a URI format to capture the fully-qualified type name and identifier of the relationship.
