---
id: model-imports
title: Imports
sidebar_position: 2
---

In order for one namespace to reference types defined in another namespace, the types must be imported from a versioned namespace. Via imports you can decompose your models into discrete files (and namespaces), version them and build a graph of dependencies between your models.

## Single Import

```js
// imports PostalAddress from version 1.0.0 of the org.accordproject.address namespace
import org.accordproject.address@1.0.0.PostalAddress 
```

## Multiple Imports

To import multiple types from the same namespace, use the `{}` syntax:

```js
// imports PostalAddress and Country from version 1.0.0 of the org.accordproject.address namespace
import org.accordproject.address@1.0.0.{PostalAddress,Country} 
```

## Importing from model published to a public URL

Import also can use the optional `from` declaration to import a model file that has been deployed to a URL.

```js
// imports a type from a publicly addressable URL
import org.accordproject.address@1.0.0.PostalAddress from https://models.accordproject.org/address.cto
```

Imports using a `from` declaration can be downloaded into the model manager by calling `modelManager.updateExternalModels` or the `concerto get` CLI command.

The Model Manager will resolve all imports to ensure that the set of declarations that have been loaded are globally consistent. 

## Aliasing imported types

Imported types can also be aliased to local names. Aliasing is only allowed using the `{}` syntax. Aliased and non-aliased types can be mixed within the same import statement, as demonstrated in the example below
```js

import org.accordproject.address@1.0.0.{PostalAddress as pa, Country}

concept Person{
    o String name
    o pa address optional
    o Country country
}
```

Import aliasing is enabled by default in Concerto v4. If you are using an older version of Concerto, set environment variable `IMPORT_ALIASING='true'` or pass `importAliasing: true` as an option to the `ModelManager` constructor.


## Strict mode

Concerto v4 runs in strict mode by default, which requires versioned namespaces and versioned imports. Unversioned namespaces and wildcard imports are not permitted in strict mode.

For backwards compatibility with older models, you can disable strict mode by passing `strict: false` to the `ModelManager` constructor. In `strict:false` mode, imports may reference unversioned namespaces or import all types in a namespace using wildcards.

> Migrate models to use versioned namespaces and imports. `strict:false` support may be removed in a future release.

```js
// import a type from an unversioned namespace (only in strict:false mode)
import org.accordproject.address.PostalAddress
// import all types from an unversioned namespace (only in strict:false mode)
import org.accordproject.address.*
```

