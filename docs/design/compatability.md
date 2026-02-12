---
id: evolution
title: Evolution
sidebar_position: 6
---

Concerto has been designed to consider model evolution (change) to be a first-class use case. Concerto namespaces are versioned using semantic versioning to ensure that dependencies between models are explicit and that the dependency graph between models is deterministic.

> Change is the only constant; Data models will change, so we need to be prepared for change

# Semantic Versioning

Also called “semver”, [semantic versioning](https://semver.org) is an industry standard set of requirements that define the meaning of a version string such as `1.0.3`, `0.74.1` or even `4.0.0-beta.2`. 

In summary, semver breaks down a version into four parts:
- MAJOR.MINOR.PATCH-PRERELEASE  

Where PRERELEASE is optional.

Further, semver defines MAJOR.MINOR.PATCH as follows

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards compatible manner, and
- PATCH version when you make backwards compatible bug fixes.

# Compatibility

When you make changes to a model some of those changes may be classes as **breaking changes**.

> Note that this is about backwards compatibility only, and says nothing about forwards compatibility.

## What is NOT a breaking change?

A model A is strictly compatible with a model B if all valid instances of the types defined by A are also valid instances of the types defined by model B.

![compatible changes](/img/compatability.png)

Examples of non-breaking changes:
- Adding a new type to model B
- Adding a new optional property to a type defined in model A to an equivalent type in model B

> Note: model A being strictly compatible with model B does not imply that model B is strictly compatible with model A! Forwards vs backwards compatibility…

## Breaking Changes

Examples of breaking changes:
- Changing the type of an property
- Changing the name of an property (or deleting an property)
- Removing a declaration
- Changing the name of an declaration
- Changing a constraint on an property
- Removing values from an enumeration
- Making a breaking change to a parent declaration
- Adding a new required property

Use the `concerto compare` [command line utility](/docs/tools/ref-concerto-cli.md) to compare two Concerto models to determine whether they are compatible.

# Considerations for Persistence

Practically speaking, once millions of instances of the types defined in model have been created then a strict governance process for model changes must be put in place.

If end-users are making model changes they should either be prevented from making breaking changes, or warned that a change is breaking and that data will need to be migrated, or that broken instances will be deleted.

When storing instances track which version of a model was used to create the instance, and we use that model+version to verify instances.
