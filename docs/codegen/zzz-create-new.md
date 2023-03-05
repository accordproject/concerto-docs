---
id: codegen-create-new
title: Create Your Own...
---

If you are an intermediate JavaScript developer it is easy to define your own code generation target.

## Metamodel Mapping

Your first task is to ensure you have a good understanding of the [Concerto metamodel](../specification/model-metamodel.md), as your will need to map **all** the elements of the Concerto metamodel to elements in your target language's metamodel.

For example, here is the mapping from the Concerto metamodel to the Go Lang metamodel:

| Concerto      | Go              | Notes                           |
|---------------|-----------------|---------------------------------|
| namespace     | package         |                                 |
| import        | import          |                                 |
| enum          | type {NAME} int |                                 |
| concept       | struct          | Concerto super type is embedded |
| field         | struct field    | Set `json:` for serialization   |
| enum Value    | struct field    | Set `iota`                      |
| scalar        | struct field    | Unbox the scalar to a field     |
| relationship  | pointer to type |                                 |
| primitives    | (see below)     |                                 |

Depending on your target language's metamodel creating this mapping may be trivial or challenging!

## Escaping Identifiers

Concerto has syntactic rules for valid identifiers for types, properties, namespaces etc. You will have to ensure that you create valid identifiers in your target language. For example, the Go code generator
converts Concerto namespaces containing `.` to Go package names containing `_`.

```
    /**
     * Converts a Concerto namespace to a Go package name.
     * See: https://rakyll.org/style-packages/
     * @param {string} namespace  - the concerto type
     * @return {string} the corresponding package name in Go Lang
     * @private
     */
    toGoPackageName(namespace) {
        return namespace.replace(/@/g, '_').replace(/\./g, '_');
    }
```

## Primitive Type Mapping

You will also have to map Concerto's primitive types to your target language type system.

For example, for Go, the mapping from Concerto primitives to Go types is as follows:

```
toGoType(type) {
        switch(type) {
        case 'DateTime':
            return 'time.Time';
        case 'Boolean':
            return 'bool';
        case 'String':
            return 'string';
        case 'Double':
            return 'float64';
        case 'Long':
            return 'int64';
        case 'Integer':
            return 'int32';
        default:
            return type;
        }
    }
```

## Code Generation

Now comes the easy part, actual code generation! 

### Code Generation Visitor

The `@accordproject/concerto-tools` package contains the code generators, implements as JavaScript classes using the [visitor pattern](https://en.wikipedia.org/wiki/Visitor_pattern).

> The code generator class for Go is available [here](https://github.com/accordproject/concerto/blob/main/packages/concerto-tools/lib/codegen/fromcto/golang/golangvisitor.js).

We recommend that you duplicate an existing code generator class for a target language that is similar to the one you are working on. You may find that there are useful functions or patterns that you can modify.

Your code generator must implement a `visit` method taking two arguments: the thing being visited (an instance of a concept from the Concerto metamodel) and a parameters object containing code generation configuration options.

The `visit` method typically delegates to internal methods that handle different elements of the Concerto metamodel:

```
visit(thing, parameters) {
        if (thing.isModelManager?.()) {
            return this.visitModelManager(thing, parameters);
        } else if (thing.isModelFile?.()) {
            return this.visitModelFile(thing, parameters);
        } else if (thing.isEnum?.()) {
            return this.visitEnumDeclaration(thing, parameters);
        } else if (thing.isClassDeclaration?.()) {
            return this.visitClassDeclaration(thing, parameters);
        } else if (thing.isTypeScalar?.()) {
            return this.visitField(thing.getScalarField(), parameters);
        } else if (thing.isField?.()) {
            return this.visitField(thing, parameters);
        } else if(thing.isRelationship?.()) {
            return this.visitRelationship(thing, parameters);
        } else if (thing.isEnumValue?.()) {
            return this.visitEnumValueDeclaration(thing, parameters);
        } else if (thing.isScalarDeclaration?.()) {
            return;
        } else {
            throw new Error('Unrecognised type: ' + typeof thing + ', value: ' + util.inspect(thing, { showHidden: false, depth: 1 }));
        }
    }
```

Many of the internal methods will simply call `accept` on a model element, passing `this` — so that the `accept` method calls back into the `visit` method on `this` code generator class (so called, double-dispatch).

For example, when we visit a ModelManager we want to visit each of the ModelFiles in the ModelManager:
```
visitModelManager(modelManager, parameters) {
        modelManager.getModelFiles(true).forEach((modelFile) => {
            modelFile.accept(this,parameters);
        });
        return null;
    }
```

### Outputing Code 

The `parameters` object contains a `fileWriter` object, an instance of `FileWriter` from `@accordproject/concerto-util`, used to write lines of generated code. Refer to [the class for details](https://github.com/accordproject/concerto/blob/main/packages/concerto-util/lib/filewriter.js). Note that there is also an [InMemoryWriter](https://github.com/accordproject/concerto/blob/main/packages/concerto-util/lib/inmemorywriter.js) which implements the same protocol but holds all contents in-memory.

> The first argument to the fileWriter.writeLine method is the number of tab stops to indent the line.

```
    visitField(field, parameters) {
        let array = '';

        if(field.isArray()) {
            array = '[]';
        }

        // we export all fields by capitalizing them
        // we strip $ as it is not legal in Go
        const name = field.getName().startsWith('$') ? field.getName().substring(1) : field.getName();
        parameters.fileWriter.writeLine(1, ModelUtil.capitalizeFirstLetter(name) + ' ' + array + this.toGoType(field.getType()) + ' `json:"' + field.getName() + '"`' );
        return null;
    }
```

### Tests

It is important to fully test your code generator. You don't want it to crash when it encounters an element of the Concerto metamodel that you have not tested! 

The existing code generators use a battery of unit tests to ensure 100% code coverage and use a set of test Concerto models. The [HR model](https://github.com/accordproject/concerto/blob/main/packages/concerto-tools/test/codegen/fromcto/data/model/hr.cto) is a useful one to use during development, and it is used by the existing unit tests. It uses many (though not all!)) of the features of the Concerto metamodel.

## Expose via Concerto CLI

To allow your code generator to be used with the Concerto CLI your code generator must assigned a target name and added to the [CodeGen module](https://github.com/accordproject/concerto/blob/main/packages/concerto-tools/lib/codegen/codegen.js).

## Contribute Back!

We would encourage you to create a pull-request with your new Code Generator, unit tests, along with a page for this documentation to show people how to use it, and to document any limitations.

Thank you in advance!