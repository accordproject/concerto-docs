---
id: api-js-models-as-json
title: Models as JSON
---

# Defining Models as JSON

Concerto models can be defined using a JSON object, rather than using the CTO syntax. This primarily intended for programmatic definition or editing of models, for example, via a model editor user interface.

[Run this code on replit](https://replit.com/@dselman/AccordProjectConcerto-Models-as-JSON)

```js
const { ModelManager, ModelFile } = require('@accordproject/concerto-core');

try {
  // create the model manager, used to manage a consistent set of
  // related models
  const mm = new ModelManager();

  // defines the namespace for the Concerto metamodel
  // the metamodel is here: https://github.com/accordproject/concerto/blob/main/packages/concerto-metamodel/lib/metamodel.cto
  const MM = 'concerto.metamodel@1.0.0'

  // create a model as a JSON object
  // defines an Address concept with three string properties:
  // street, city and zip, with zip being an optional property
  const modelAst = { 
    $class: `${MM}.Model`, 
    namespace: "test@1.0.0",
    declarations: [
      { $class: `${MM}.ConceptDeclaration`, 
       name: "Address", 
       properties: [
         { $class: `${MM}.StringProperty`, name: "street"}, 
         { $class: `${MM}.StringProperty`, name: "city"}, 
         { $class: `${MM}.StringProperty`, name: "zip", isOptional: true}
       ] }
    ] 
  };

  // validates the JSON model
  const modelFile = new ModelFile(mm, modelAst);

  // adds the model to the model manager
  // and checks consistency
  mm.addModelFile(modelFile);

  // we can now retrieve a type from the model manager
  const addressType = mm.getType('test@1.0.0.Address');
console.log(addressType.toString());
}
catch (err) {
  console.log(err)
}
```
