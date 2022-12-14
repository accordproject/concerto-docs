---
id: codegen-csharp
title: C#
---

C# (pronounced see sharp) is a general-purpose, high-level multi-paradigm programming language.

```base
concerto compile --model test.cto --target csharp
```

## Sample Output

```cs
namespace Test;
using AccordProject.Concerto;
[AccordProject.Concerto.Type(Namespace = "test", Version = "1.0.0", Name = "Person")]
[System.Text.Json.Serialization.JsonConverter(typeof(AccordProject.Concerto.ConcertoConverterFactorySystem))]
public class Person : Concept {
   [System.Text.Json.Serialization.JsonPropertyName("$class")]
   public override string _Class { get; } = "test@1.0.0.Person";
   [AccordProject.Concerto.Identifier()]
   [System.Text.Json.Serialization.JsonPropertyName("email")]
   public string Email { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("dob")]
   public System.DateTime Dob { get; set; }
}
```

## Options

- useSystemTextJson: compile for System.Text.Json library
- useNewtonsoftJson: compile for Newtonsoft.Json library
- namespacePrefix: a prefix to add to all namespaces
- pascalCase: use PascalCase for generated identifier names

## Limitations

1. Scalars are unboxed as properties
