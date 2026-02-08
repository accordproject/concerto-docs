---
id: codegen-avro
title: Apache Avro
---

[Apache Avro](https://avro.apache.org) is an Open Source schema and IDL language from Apache. It is often used with Apache Kafka or other big data tools.

Converts the Concerto model to an Avro `.avdl` file. Use `avro-tools.jar` to convert AVDL to a JSON Avro schema.

```base
concerto compile --model test.cto --target avro
```

## Sample Output

```
@namespace("test@1.0.0")
protocol MyProtocol {

   import idl "concerto@1.0.0.avdl";
   
   record Person {
      string email;
      union { null, string } dob;
   }
}
```

## Options

None.

## Limitations

1. `$identifier` and `$timestamp` cannot be used as a property names, so these are converted to `_identifier` and `_timestamp`.
2. DateTime is stored as a `long` with the `@logicalType("timestamp-micros")` annotation
3. No super types, so properties across the inheritance hierarchy are merged into each record
4. Relationships are represented as `string`
5. Scalars are unboxed as properties

