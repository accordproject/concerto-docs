---
sidebar_position: 1
---

# Introduction

Concerto is a lightweight schema language and runtime for business concepts.

```cs
concept Person identified by name  {
  o String name
  o Address address optional
  @description("Height (cm)")
  o Double height range=[0,]
  o DateTime dateOfBirth 
}
```

🏢 Concerto gives you “just enough” expressivity to capture real-world business models, while remaining easy to map to most runtime environments.

⛳ An object-oriented language that is much easier to read and write than JSON/XML Schema, XMI or equivalents.

📄 Serialize your instances to JSON

🍪 Deserialize (and validate) instances from JSON

🔎 Runtime introspection of the model using a powerful set of APIs

🎛 Convert the model to [14+ common data model formats](./category/code-generation)

🕸 Publish your reusable models to any website, including the Accord Project [model repository](https://models.accordproject.org)

Infer models from other formats:
- JSON document
- JSON Schema
- OpenAPI v3 specification document