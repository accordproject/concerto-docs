---
id: api-js-decorator-command-set
title: Decorator Command Sets
---

# Using Decorator Command Sets

Decorator Command Sets are used to externalize decorators from models and to selectively apply them to models.

[Run this code on replit](https://replit.com/@dselman/AccordProjectConcerto-Decorator-Command-Set)

```js
const { ModelManager, Concerto, DecoratorManager } = require('@accordproject/concerto-core');
const { Printer } = require('@accordproject/concerto-cto');

try {
  // create the model manager, used to manage a consistent set of
  // related models
  const mm = new ModelManager();

  // add a CTO file (as a string) to the model manager
  mm.addModel(`namespace test@1.0.0

abstract concept Person identified by ssn
{
	o String firstName
	o String lastName
  o String ssn
}

concept Driver extends Person {
  o String favoriteColor
}

concept Employee {
  o String ssn
}

concept Car identified by vin
{
	o String vin
	o Person owner
}`);

  // create a decorator command set:
  // 1. It a command to add the @PII decorator to any properties 
  // with the name 'ssn'.
  // 2. Any properties of type 'Object' get the @Hide decorator applied
  // Properties can be targeted by [namespace].[concept].[propertyName] 
  // or even by type
  const dcms = {
    "$class": "org.accordproject.decoratorcommands.DecoratorCommandSet",
    "name": "pii",
    "version": "1.0.0",
    "commands": [
      {
        "$class": "org.accordproject.decoratorcommands.Command",
        "type": "UPSERT",
        "target": {
          "$class": "org.accordproject.decoratorcommands.CommandTarget",
          "property": "ssn"
        },
        "decorator": {
          "$class": "concerto.metamodel@1.0.0.Decorator",
          "name": "PII",
          "arguments": [
          ]
        }
      },
      {
        "$class": "org.accordproject.decoratorcommands.Command",
        "type": "UPSERT",
        "target": {
          "$class": "org.accordproject.decoratorcommands.CommandTarget",
          "type": "concerto.metamodel@1.0.0.ObjectProperty"
        },
        "decorator": {
          "$class": "concerto.metamodel@1.0.0.Decorator",
          "name": "Hide",
          "arguments": [{
                        "$class" : "concerto.metamodel@1.0.0.DecoratorString",
                        "value" : "object"
                      }]
        }
      }
    ]
  };

  // apply to the model
  const newModelManager = DecoratorManager.decorateModels(mm, dcms);

  // get the type declaration for the data
  const typeDeclaration = newModelManager.getType('test@1.0.0.Driver');

  // print the decorated model as a CTO string
  const modelAst = typeDeclaration.getModelFile().getAst();
  const decoratedCto = Printer.toCTO(modelAst);
  console.log('Model with decorator command set applied:');
  console.log(decoratedCto);
}
catch (err) {
  console.log(err)
}
```

These APIs allow you to programmatically apply decorators to a model.