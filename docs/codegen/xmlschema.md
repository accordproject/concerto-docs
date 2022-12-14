---
id: codegen-xmlschema
title: XML Schema
---

An XML Schema is a language for expressing constraints about XML documents.

```base
concerto compile --model test.cto --target xmlschema
```

## Sample Output

```xml
<?xml version="1.0"?>
<xs:schema xmlns:test="test" targetNamespace="test" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema" 
xmlns:concerto="concerto"
>
<xs:import namespace="concerto" schemaLocation="concerto@1.0.0.xsd"/>
<xs:complexType name="Person">
   <xs:complexContent>
   <xs:extension base="concerto:Concept">
   <xs:sequence>
      <xs:element name="email" type="xs:string"/>
      <xs:element name="dob" type="xs:dateTime"/>
   </xs:sequence>
   </xs:extension>
   </xs:complexContent>
</xs:complexType>
<xs:element name="Person" type="test:Person"/>
</xs:schema>
```

## Options

None.

## Limitations

1. Scalars are unboxed as properties