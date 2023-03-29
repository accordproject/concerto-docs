---
id: why-concerto
title: Why Concerto?
sidebar_position: 2
---

# Why Concerto?

All software applications have a data or domain model. In fact, there are typically many representations of the domain model spread across the various tiers of the application: mobile, web, business logic, database, business intelligence, streaming analytics, marketing etc. A major challenge for larger or more complex applications is how to keep all these various model representations in sync and consistent.

![3-tier architecture](/img/3tier-arch.png)
[*Credit*](https://levelup.gitconnected.com/a-complete-guide-build-a-scalable-3-tier-architecture-with-mern-stack-es6-ca129d7df805)

## What is a Domain Model?

A [domain model](https://en.wikipedia.org/wiki/Domain_model) is a system of abstractions that describes selected aspects of a sphere of knowledge, influence or activity (a domain).  The model can then be used to solve problems related to that domain. The domain model is a representation of meaningful real-world concepts pertinent to the domain that need to be modeled in software. 

The concepts include the data involved in the business and rules the business uses in relation to that data. A domain model leverages natural language of the domain.

## Types of Models

It is useful to distinguish between three different types of models: CIM, PIM and PSM, created for different purposes and users, with different levels of abstraction. Concerto can help you keep CIM, PIM and PSM models consistent.

### Computation Independent Models (CIM)

This are frequently business glossaries, ontologies, or vocabularies (set of agreed business terms). They could be expressed as document, spreadsheets, or even diagrams. They require human interpretation and do not contain sufficient detail for computation.

### Platform Independent Model (PIM)

Platform Independent Models may serve as a pivot model between CIM models and PSM models. Concerto is a good example of a PIM modelling language; designed to capture the details of a domain in sufficient detail that useful platform specific code can be generated from the model, or the model could be related to [vocabulary terms](/docs/design/vocabulary).

### Platform Specific Model (PSM)

A Platform Specific Model is built by a developer for a specific programming language or runtime. For example, you can use Concerto [code generation](./category/code-generation) to create platform specific models from your Concerto model.

## Creating Generic Tools

Models are required to create *generic tools* because you need to write code that reasons about the structure of **user-defined domain models**. As soon as you want to implement something like a "No Code tool", Object-Relational-Mapper, expression/formula language, query builder, REST API browser or web-form generator, you need a data model that can be introspected at runtime.

## Choosing a Data Model Language

> ".. all models are approximations. Essentially, [all models are wrong](https://en.wikipedia.org/wiki/All_models_are_wrong), but some are useful. However, the approximate nature of the model must always be borne in mind...."

The data model for your application can either be implicit (duck typing...) or explicit. If it is explicit, it can be expressed using a wide range of technology including XML Schema, JSON Schema, protobufs, NoSQL design documents, Java classes, Typescript types, Go structs, RDBMS tables, ad-hoc JSON or YAML documents... the list is almost endless.

These different model representations make different trade-offs with respect to:
- Integration with computation
- Optimization of serialization/wire format
- Cross-platform usage
- Industry acceptance
- Human readability and editability
- Expressiveness of the metamodel
- Composability and reuse

If developers define models as part of application development, they tend to favour creating Java classes, Go structs, Typescript or similar, because they want to express the model in a language they are familiar with and that integrates closely with the type-system used for compilation and computation. The major downside with this approach is that it is almost impossible to then share and reuse these models outside of a single application. It also doesn’t integrate well with modern application development, where we may use different technology across the web, mobile, middle and backend tiers of an application. Out of sync models (or model mapping) is a huge source of industry anguish and bugs.

When industry-standards bodies define models, they tend to favour representations that are more cross-platform and less tied to computation, such as publishing XML Schemas, JSON Schemas or RDF. Developers tend not to like using these models because the mapping from things like XML Schema to Java classes or Go structs for use at runtime is lossy/messy/complex.

## Advantages of Concerto

Concerto solves many of these problems by providing an Object-Oriented schema language that allows models to be moved outside of applications while mapping quite naturally to most common programming languages. We like to think of it as a “goldilocks” approach to modeling, “just enough” expressivity to cover most business use cases, with a natural mapping to most common programming languages, and with a intuitive JSON serialization. 

Concerto has particularly strong support for modularity and reuse, good JSON serialization, and [code generators](./category/code-generation) for many common programming languages and data model formats.

Concerto has a powerful Command Line Interface to work with models, as well as runtimes in JavaScript (it can even be used in a web-browser), and experimental support for C#.

## Additional Reading

1. [Strongly-typed Data for JavaScript (and beyond)](https://accordproject.org/news/strongly-typed-data-for-javascript-and-beyond/)
2. [The Case for Models](https://concerningquality.com/models/).
3. [Model Driven Engineering](https://en.wikipedia.org/wiki/Model-driven_engineering)
4. [Whatever happened to model driven development?](https://neil-crofts.medium.com/whatever-happened-to-model-driven-development-ec0175139720)
