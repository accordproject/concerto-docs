---
id: codegen-odata
title: OData
---

OData (Open Data Protocol) is defines a set of best practices for building and consuming RESTful APIs.

```base
concerto compile --model test.cto --target odata
```

## Sample Output

```xml
<?xml version="1.0"?>
<edmx:Edmx xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" Version="4.0">
<edmx:Reference Uri="http://docs.oasis-open.org/odata/odata/v4.0/cs01/vocabularies/Org.OData.Core.V1.xml">
   <edmx:Include Namespace="Org.OData.Core.V1" Alias="Core" />
</edmx:Reference>
<edmx:Reference Uri="./concerto.csdl">
   <edmx:Include Namespace="concerto" />
</edmx:Reference>
<edmx:DataServices>
   <Schema xmlns="http://docs.oasis-open.org/odata/ns/edm" Namespace="test">
      <EntityType Name="Person"  BaseType="concerto.Concept">
         <Key><PropertyRef Name="email"/></Key>
         <Property Name="email" Type="Edm.String"  >
         </Property>
         <Property Name="dob" Type="Edm.DateTimeOffset" Nullable="true" >
         </Property>
      </EntityType>
   <EntityContainer Name="testService">
      <EntitySet Name="Person" EntityType="test.Person"/>
   </EntityContainer>
   </Schema>
</edmx:DataServices>
</edmx:Edmx>
```

## Options

None.

## Limitations

1. Scalars are unboxed as properties