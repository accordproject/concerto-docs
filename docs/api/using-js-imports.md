---
id: api-js-imports
title: Imports
---

# Defining Models Using Multiple Namespaces

Concerto models in one namespace can import types defined in other namespaces.

[Run this code on replit](https://replit.com/@dselman/AccordProjectConcerto-Imports)

```js
const { ModelManager, Concerto } = require('@accordproject/concerto-core');

try {
  // create the model manager, used to manage a consistent set of
  // related models
  const mm = new ModelManager();

  // add a CTO file (as a string) to the model manager
  // note that this model file imports types from the 
  // person@1.0.0 namespace, so we pass 'true' as the third argument
  // to disable consistency validation as this file (on its own)
  // is invalid.
  mm.addCTOModel(`namespace cars@1.0.0

  import person@1.0.0.{Person}

  concept Driver extends Person {
  o String favoriteColor
}

concept Car identified by vin
{
	o String vin
	o Person owner
}`, 'car.cto', true)

  // next we load the person@1.0.0 namespace
  mm.addCTOModel(`namespace person@1.0.0

abstract concept Person
{
	o String firstName
	o String lastName
}`, 'person.cto', true);

  // now we call validateModelFiles to verify the
  // consistency of the model manager, which will check that
  // all imports resolve
  mm.validateModelFiles();

  // we can now retrieve a type from the model manager
  const carType = mm.getType('cars@1.0.0.Car');
  console.log(carType.toString());
}
catch (err) {
  console.log(err)
}
```
