---
id: codegen-vocabulary
title: Vocabulary
---

The Vocabulary file for Concerto has human-readable labels (Terms) to be associated with model elements. Terms are stored within a locale specific vocabulary YAML file associated with a Concerto namespace.

```base
concerto compile --model test.cto --target vocabulary
```

## Sample Output

```
#Generated vocabulary for namespace: test@1.0.0
locale: en
namespace: test@1.0.0
declarations:
  - OrderLine: Order Line
    properties:
      - orderLineId: Order Line Id of the Order Line
      - sku: Sku of the Order Line
  - Order: Order
    properties:
      - orderId: Order Id of the Order
      - orderlines: Orderlines of the Order
  - Address: Address
    properties:
      - street: Street of the Address
      - city: City of the Address
      - zip: Zip of the Address
  - SSN: SSN
  - Person: Person
    properties:
      - ssn: Ssn of the Person
      - givenName: Given Name of the Person
  - LoyaltyStatus: Loyalty Status
    properties:
      - level: Level of the Loyalty Status
  - Color: Color
    properties:
      - RED: RED of the Color
      - GREEN: GREEN of the Color
      - BLUE: BLUE of the Color
      - PINK: PINK of the Color
      - BLACK: BLACK of the Color
      - WHITE: WHITE of the Color
  - Preferences: Preferences
    properties:
      - favoriteColors: Favorite Colors of the Preferences
  - TemplateData: Template Data
    properties:
      - firstName: First Name of the Template Data
      - lastName: Last Name of the Template Data
      - middleNames: Middle Names of the Template Data
      - active: Active of the Template Data
      - lastVisit: Last Visit of the Template Data
      - address: Address of the Template Data
      - orders: Orders of the Template Data
      - loyaltyStatus: Loyalty Status of the Template Data
      - preferences: Preferences of the Template Data
```

## Options

None.

## Limitations

1. Scalars are unboxed as properties