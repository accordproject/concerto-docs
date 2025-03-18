---
id: decoratorcommands
title: Decorator Commands
sidebar_position: 7
---

Decorator Command Sets are an advanced feature that allow you to externalize the definition of decorators from your model into a JSON file, and then to programmatically apply the Decorator Commands to a model at runtime, to produce a newly decorated model.

Decorator Commands can add/update/remove decorators to targeted elements in the model: namespace, concepts, properties etc.

Decorator Command Sets are useful to dynamically decorate your models, keeping the models clean, whilst exposing decorated model elements to clients. 

For example, you can decorate a model with [Vocabulary](/docs/design/vocabulary) terms by requesting that the `VocabularyManager` convert the vocabulary to a Decorator Command Set, which can then be applied to the model.

```js
// generate decorators for the 'en-GB' locale
const commandSet = vocabularyManager.generateDecoratorCommands(modelManager, 'en-GB');

// decorator the models, using the default namespace org.acme.decorators@1.0.0 for decorator
// commands that do not supply an explicit namespaces for their decorators
const newModelManager = DecoratorManager.decorateModels(modelManager, commandSet,
    {
        validate: true, validateCommands: true, 
        migrate: true, 
        defaultNamespace: 'org.acme.decorators@1.0.0'
    });
```

Sample input model to decorate:

```js
namespace test@1.0.0

// declare decorator commands
import concerto.decorator@1.0.0.Decorator
concept New extends Decorator {}
concept Editable extends Decorator {}
concept Custom extends Decorator {}
concept Form extends Decorator {
    o String key
    o String value
}

// define model and use decorators
@Editable
concept Person {
    @Custom
    o String firstName
    o String lastName
    o String bio
    o String ssn
}
```

Using the Concerto Core API to apply a decorator command set:

```js
// load a model to decorate
const testModelManager = new ModelManager();
const modelText = fs.readFileSync('./test/data/decoratorcommands/test.cto', 'utf-8');
testModelManager.addCTOModel(modelText, 'test.cto');

// decorate the models, returning the modified model manager
const dcs = fs.readFileSync('./test/data/decoratorcommands/web.json', 'utf-8');
const decoratedModelManager = DecoratorManager.decorateModels( testModelManager, JSON.pars(dcs));
```

The Decorator Command Set below defines three decorator commands:
1. Upsert (update/insert) the `@Form("inputType", "text")` decorator to all properties on type `String`
2. Append the `@New` decorator to all properties of type `String`
3. Upsert the `@Form("inputType", "textArea")` decorator to the `test.Person.bio` property

Definition of Decorator Command Set:

```json
{
    "$class" : "org.accordproject.decoratorcommands@0.4.0.DecoratorCommandSet",
    "name" : "web",
    "version": "1.0.0",
    "commands" : [
        {
            "$class" : "org.accordproject.decoratorcommands@0.4.0.Command",
            "type" : "UPSERT",
            "target" : {
                "$class" : "org.accordproject.decoratorcommands@0.4.0.CommandTarget",
                "type" : "concerto.metamodel@1.0.0.StringProperty"
            },
            "decorator" : {
                "$class" : "concerto.metamodel@1.0.0.Decorator",
                "name" : "Form",
                "namespace" : "test@1.0.0",
                "arguments" : [
                    {
                        "$class" : "concerto.metamodel@1.0.0.DecoratorString",
                        "value" : "inputType"
                    },
                    {
                        "$class" : "concerto.metamodel@1.0.0.DecoratorString",
                        "value" : "text"
                    }
                ]
            }
        },
        {
            "$class" : "org.accordproject.decoratorcommands@0.4.0.Command",
            "type" : "APPEND",
            "target" : {
                "$class" : "org.accordproject.decoratorcommands@0.4.0.CommandTarget",
                "type" : "concerto.metamodel@1.0.0.StringProperty"
            },
            "decorator" : {
                "$class" : "concerto.metamodel@1.0.0.Decorator",
                "name" : "New",
                "namespace" : "test@1.0.0",
                "arguments" : []
            }
        },
        {
            "$class" : "org.accordproject.decoratorcommands@0.4.0.Command",
            "type" : "UPSERT",
            "target" : {
                "$class" : "org.accordproject.decoratorcommands@0.4.0.CommandTarget",
                "namespace" : "test",
                "declaration" : "Person",
                "property" : "bio"
            },
            "decorator" : {
                "$class" : "concerto.metamodel@1.0.0.Decorator",
                "name" : "Form",
                "namespace" : "test@1.0.0",
                "arguments" : [
                    {
                        "$class" : "concerto.metamodel@1.0.0.DecoratorString",
                        "value" : "inputType"
                    },
                    {
                        "$class" : "concerto.metamodel@1.0.0.DecoratorString",
                        "value" : "textArea"
                    }
                ]
            }
        }
    ]
}
```

Model file with decorators applied (output):

```js
namespace test@1.0.0
import concerto.decorator@1.0.0.Decorator

concept New extends Decorator {}
concept Editable extends Decorator {}
concept Custom extends Decorator {}
concept Form extends Decorator {
    o String key
    o String value
}

@Editable
concept Person {
    @Custom
    @Form("inputType", "text")
    @New
    o String firstName
    @Form("inputType", "text")
    @New
    o String lastName
    @Form("inputType", "textArea")
    @New
    o String bio
    @Form("inputType", "text")
    @New
    o String ssn
}
```