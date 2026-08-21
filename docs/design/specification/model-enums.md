---
id: model-enums
title: Enumerations
sidebar_position: 3
---

Enumerations are used to capture static lists of domain values.

```js
enum Cardsuit {
  o CLUBS
  o DIAMONDS
  o HEARTS
  o SPADES
}
```

## Extending value sets across namespaces

`enum` declarations are **closed**: the set of valid values is exactly what's declared, and adding a value later is a versioned, breaking change to the base model. That's the right default — most enumerations should stay closed.

Sometimes, though, a value set genuinely needs to grow without touching the base model: for example, an application wants to let each of its customers add custom options to a shared list (a base set of business line codes, extended per-tenant), and coordinating a version bump of the base model for every addition isn't practical.

For this case, model the value set as an `abstract concept` instead of an `enum`, and represent each value as its own subtype:

```js
namespace vehicle-status@1.0.0

abstract concept VehicleStatus {}
concept Started extends VehicleStatus {}
concept Stopped extends VehicleStatus {}
```

A consumer in a different namespace can then add its own values, without ever modifying `vehicle-status@1.0.0`:

```js
namespace acme@1.0.0

import vehicle-status@1.0.0.{VehicleStatus}

concept Idling extends VehicleStatus {}
```

Fields typed as `VehicleStatus` accept any loaded subtype, and the serialized form carries an unambiguous, namespace-qualified discriminator:

```json
{ "status": { "$class": "acme@1.0.0.Idling" } }
```

This relies on ordinary [concept](./model-classes.md) polymorphism, so it works today with no new syntax. Each extension lives in its own namespace, so two unrelated extensions can never collide on a name the way two plain strings could, and `$class` always tells you exactly where a value came from — including which model needs to be loaded to recognize it.

The main trade-off versus a plain `enum` is ergonomic rather than semantic: values are small objects (`{"$class": "..."}`) rather than bare strings, and nothing in the language stops an extension concept from picking up its own properties — treat "value" concepts as intentionally empty and propertyless by convention.

See [issue #1200](https://github.com/accordproject/concerto/issues/1200) for the full design discussion, including a first-class `domain`/`member` syntax under consideration as a more compact, purpose-built alternative to this pattern.

