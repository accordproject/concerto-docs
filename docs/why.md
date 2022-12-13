---
id: why-concerto
title: Why Concerto?
sidebar_position: 2
---

# Why Concerto?

All software applications have a data or domain model.

Models are required to create *generic tools* because you need to write code that reasons about the structure of user-defined domain models. As soon as you want to implement something like an Object-Relational-Mapper or REST API browser or web-form generator, you need a data model.

The data model for your application can either be implicit (duck typing...) or explicit. If it is explicit, it can be expressed using a wide range of technology including XML Schema, JSON Schema, protobufs, NoSQL design documents, Loopback schema, Java classes, Go structs, RDBMS tables, ad-hoc JSON or YAML documents... the list is almost endless.

These different model representations make different trade-offs with respect to:
- Integration with computation
- Optimization of serialization/wire format
- Cross-platform usage
- Industry acceptance
- Human readability and editability
- Expressiveness of the metamodel
- Composability and reuse

If developers define models as part of application development, they tend to favour creating Java classes, Go structs, Typescript or similar, because they want to express the model in a language they are familiar with and that integrates closely with the type-system used for computation. The major downside with this approach is that it is almost impossible to then share and reuse these models outside of a single application. It also doesn’t integrate well with modern application development, where we may use different technology across the web, mobile, middle and backend tiers of an application. Out of sync models (or model mapping) is a huge source of anguish and bugs.

When industry-standard bodies define models, they tend to favour representations that are more cross-platform and less tied to computation, such as publishing XML Schemas. Developers tend not to like using these models because the mapping from things like XML Schema to Java classes or Go structs for use at runtime is lossy/messy/complex.

Concerto solves many of these problems by providing an Object-Oriented schema language that allows models to be moved outside of applications while mapping quite naturally to most common programming languages. We like to think of it as a “goldilocks” approach to modeling, “just enough” expressivity to cover most business use cases, with a natural mapping to most common programming languages, and with a JSON serialization.

## Additional Reading

1. [Strongly-typed Data for JavaScript (and beyond)](https://accordproject.org/news/strongly-typed-data-for-javascript-and-beyond/)

2. [The Case for Models](https://concerningquality.com/models/).
