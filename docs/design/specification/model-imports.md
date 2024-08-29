---
id: model-imports
title: Imports
sidebar_position: 2
---

In order for one namespace to reference types defined in another namespace, the types must be imported from a versioned namespace. Via imports you can decompose your modles into discrete files (and namespaces), version them and build a graph of dependencies between your models.

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

**Note:**  Aliasing is disabled by default in concerto. To enable this feature in Concerto, provide importAliasing as an option to the Concerto ModelManager constructor.


## Strict:false mode

For backwards compatability, and when running with `strict:false` imports may import types from unversioned namespaces, or may import all types in a namespace. 

> Please migrate models to use versioned namespaces and imports as this capability will be deprecated and removed in a future major release.

Imports can be either qualified or can use wildcards.

```js
// import a type from an unversioned namespace (only if strict=false)
import org.accordproject.address.PostalAddress
// import all types from an unversioned namespace (only if strict=false)
import org.accordproject.address.*
```

