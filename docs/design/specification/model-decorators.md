---
id: model-decorators
title: Decorators
sidebar_position: 6
---

Model elements may have arbitrary decorators (aka annotations) placed on them. These are available via API and can be useful for tool vendors to extend the metamodel, or to add application specific metadata to a model.

A decorator on a namespace:

```
@Hide
namespace test@1.0.0
```

A decorator on a concept:

```
namespace test@1.0.0

@Hide
concept Person {
}
```

A decorator on a property of a concept:

```
namespace test@1.0.0

concept Person {
  @Hide
  o String ssn
}
```

The structure of decorators is declared by extending the system defined `concerto.decorator@1.0.0.Decorator` concept.

```js
// declare the decorator
import concerto.decorator@1.0.0.Decorator
concept Hide extends Decorator {
  o Boolean hidden optional
}

// use the decorator
@Hide(false)
asset Order identified by orderId {
  o String orderId
}
```

Decorators have a list of an arbitrary number of arguments. The support arguments types are:
- String
- Boolean
- Number (Integer, Long, Double)
- Type reference

Resource definitions and properties may be decorated with 0 or more decorations. Note that only a single instance of a decorator is allowed on each element type. I.e. it is invalid to have the `@Hide` decorator listed twice on the same element.

Decorators are accessible at runtime via the `ModelManager` introspect APIs. This allows tools and utilities to use Concerto to describe a core model, while decorating it with sufficient metadata for their own purposes.

The example below retrieves the 3rd argument to the `@Hide` decorator attached to the `myField` property of a class declaration:

```js
const val = myField.getDecorator('Hide').getArguments()[2];
```

## Decorator Validation

The ModelManager supports (optional) decorator validation, enforcing that decorators are declared and that the arguments to a decorator matches its declaration.

To configure the ModelManager with decorator validation:

```js
  validatedModelManager = new ModelManager({
      strict: true, decoratorValidation: {
          missingDecorator: 'error',
          invalidDecorator: 'error'
      }
  });
```

The `missingDecorator` option is used to control the validation behavior if an undeclared decorator is used on a model element. While the `invalidDecorator` option controls the validation of decorator arguments. Using these two options the ModelManager can be configured to log warning messages for missing decorators, while producing errors for invalid usage of declared decorators, or other scenarios.

Both the  `missingDecorator` and `invalidDecorator` options can be `undefined` (to switch off validation) or may be one of the defined log levels: `error, warn, info` etc. If the log level is set to `error` then a log message will be output and an exception is thrown, ensuring that only valid decorators may be used in the model.

## Vocabulary Manager

The `VocabularyManager` can be used to decorate a model with `@Term` decorations, generated from a Vocabulary.

## Decorator Manager

The `DecoratorManager` is used to externalize decorators from models into JSON Decorator Command Set files, and then to dynamically apply them back onto a `ModelManager`.
