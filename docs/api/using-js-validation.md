---
id: api-js-validation
title: Validating Data
---

# Validating JSON data and Introspecting a Model

Concerto provides a JSON serialization for instances of a model, and APIs to validate JSON data against a model.

[Run this code on replit](https://replit.com/@dselman/AccordProjectConcerto)

```js
const { ModelManager, Concerto } = require('@accordproject/concerto-core');

try {
  // create the model manager, used to manage a consistent set of
  // related models
  const mm = new ModelManager();

  // add a CTO file (as a string) to the model manager
  mm.addModel(`namespace test@1.0.0

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

  // create the Concerto instance to validate data 
  // against the model and to introspect the model
  // the Concerto instance is bound to a model manager
  const concerto = new Concerto(mm);

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

  // validate the data
  concerto.validate(data);
  console.log('Valid data!')

  // get the type declaration for the data
  const typeDeclaration = concerto.getTypeDeclaration(data);

  // get the fully-qualified name for the type declaration
  const fqn = typeDeclaration.getFullyQualifiedName();
  console.log(fqn);
  // iterate over each of the properties of the type declaration
  typeDeclaration.getProperties().forEach(p => console.log(`- ${p.getName()} : ${p.getFullyQualifiedTypeName()}`));
}
catch (err) {
  console.log(err)
}
```

These APIs allow you to examine the declared properties, super types and meta-properies for a modelled type.