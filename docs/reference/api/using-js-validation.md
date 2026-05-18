---
id: api-js-validation
title: Validating Data
---

# Validating JSON data and Introspecting a Model

Concerto provides a JSON serialization for instances of a model, and APIs to validate JSON data against a model.

```js
const { ModelManager } = require('@accordproject/concerto-core');

try {
  // create the model manager, used to manage a consistent set of
  // related models
  const mm = new ModelManager();

  // add a CTO file (as a string) to the model manager
  mm.addCTOModel(`namespace test@1.0.0

abstract concept Person
{
	o String firstName
	o String lastName
}

concept Driver extends Person {
  o String favoriteColor
}

concept Car identified by vin
{
	o String vin
	o Person owner
}`);

  // define some sample data, consistent with the model
  const data = {
    $class: "test@1.0.0.Car",
    vin: "abc123",
    owner: {
      $class: "test@1.0.0.Driver",
      firstName: "John",
      lastName: "Doe",
      favoriteColor: "Blue"
    }
  };

  // validate the data using the Serializer — fromJSON throws if the data is invalid
  const serializer = mm.getSerializer();
  serializer.fromJSON(data);
  console.log('Valid data!');

  // get the type declaration for the data
  const typeDeclaration = mm.getType(data.$class);

  // get the fully-qualified name for the type declaration
  const fqn = typeDeclaration.getFullyQualifiedName();
  console.log(fqn);
  // iterate over each of the properties of the type declaration
  typeDeclaration.getProperties().forEach(p => console.log(`- ${p.getName()} : ${p.getFullyQualifiedTypeName()}`));
}
catch (err) {
  console.log(err);
}
```

These APIs allow you to examine the declared properties, super types and meta-properties for a modelled type.
