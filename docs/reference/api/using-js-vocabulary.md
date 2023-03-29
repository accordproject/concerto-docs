---
id: api-js-vocabulary
title: Vocabulary
---

# Using Vocabulary Manager to Apply Terms to a Model

The Vocabulary Manager manages a set of localised terms for a model. 

[Run this code on replit](https://replit.com/@dselman/AccordProjectConcerto-Vocabulary)

```js
const { ModelManager, Concerto, DecoratorManager } = require('@accordproject/concerto-core');
const { VocabularyManager } = require('@accordproject/concerto-vocabulary');
const { Printer } = require('@accordproject/concerto-cto');

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

  // create the vocabulary manager, used to localize a model into a locale
  // we register a function to be used to create terms that have not been set
  const vocManager = new VocabularyManager( {missingTermGenerator: VocabularyManager.englishMissingTermGenerator});

  // define the English vocabulary
vocManager.addVocabulary(`
locale: en
namespace: test@1.0.0
declarations:
  - Person: A person
    properties:
      - lastName: Last name
      - firstName: First name
  - Driver: A driver of a vehicle
    properties:
      - favoriteColor: favorite color`);

  // define the British English vocabulary
vocManager.addVocabulary(`
locale: en-gb
namespace: test@1.0.0
declarations:
  - Driver: A driver of a vehicle
    properties:
      - favoriteColor: favourite colour`);

  // generate decorators for the 'en-gb' locale
  // try changing this to 'en' and check the term for Driver.favoriteColor
  const commandSet = vocManager.generateDecoratorCommands(mm, 'en-gb');
  
  // apply to the model
  const newModelManager = DecoratorManager.decorateModels( mm, commandSet);
  
  // get the type declaration for the data
  const typeDeclaration = newModelManager.getType('test@1.0.0.Driver');

  // for fun, let's print the decorated model as a CTO string
  const modelAst = typeDeclaration.getModelFile().getAst();
  const decoratedCto = Printer.toCTO(modelAst);
  console.log('Model Decorated with Terms for en-gb locale:');
  console.log(decoratedCto);

  // note the terms used for the Car: these were all created by 
  // the VocabularyManager.englishMissingTermGenerator function that
  // we registered on the VocabularyManager

  // get the fully-qualified name for the type declaration
  const fqn = typeDeclaration.getFullyQualifiedName();
  console.log(fqn);
  // iterate over each of the properties of the type declaration
  // and print the decorators and arguments
  typeDeclaration.getProperties().forEach(
    p => console.log(`- ${p.getName()} : ${p.getFullyQualifiedTypeName()} ${p.getDecorators().map(d => `[${d.getName()}=${d.getArguments()}`)}]`));
}
catch (err) {
  console.log(err)
}
```

These APIs allow you to manage the localised terms associated with a model.