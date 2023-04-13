---
id: codegen-csharp
title: C#
---

C# (pronounced see sharp) is a general-purpose, high-level multi-paradigm programming language.

```base
concerto compile --model test.cto --target csharp
```

## Decorators

* ** @DotNetType("") **- this decorator can be used to map a field to dotnet specific data type.

Allowed data types - 
```
bool,byte,char,decimal,double,float,int,long,nint,nuint,sbyte,short,string,uint,ulong,ushort
```

>  Note: The CSharp codegen performs a check to ensure that the configured data type is among the allowed data types, but it doesn't verify compatibility between the configured CTO type and .NET type. 

* ** @AcceptedValue("") **- this decorator can be used to configure custom value for an enum field.

Eg, test.cto
```
namespace test@1.0.0

@resource
concept Person identified by email {
  o String email
  o DateTime dob optional
  @DotNetType("decimal")
  o Double currencyValue
}

enum RenewalType {
  @AcceptedValue("automatic renewal")
  o AutomaticRenewal
  @AcceptedValue("optional renewal")
  o OptionalRenewal
}
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
   public System.DateTime? Dob { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("currencyValue")]
   public decimal CurrencyValue { get; set; }
}

[System.Text.Json.Serialization.JsonConverter(typeof(System.Text.Json.Serialization.JsonStringEnumConverter))]
public enum RenewalType {
   [System.Runtime.Serialization.EnumMember(Value = "automatic renewal")]
   AutomaticRenewal,
   [System.Runtime.Serialization.EnumMember(Value = "optional renewal")]
   OptionalRenewal,
}
```

## Options

- useSystemTextJson: compile for System.Text.Json library
- useNewtonsoftJson: compile for Newtonsoft.Json library
- namespacePrefix: a prefix to add to all namespaces
- pascalCase: use PascalCase for generated identifier names
- enableReferenceType: use enableReferenceType to add only the identifier of the relationship property instead of embedding the entire class

## Limitations

1. Scalars are unboxed as properties
