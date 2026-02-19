# Generated vocabulary for namespace: test@1.0.0
locale: en
namespace: test@1.0.0

declarations:
  - OrderLine:
      terms:
        - Order Line
        - Line Item
      properties:
        - orderLineId:
            terms:
              - Order Line Id of the Order Line
              - Line Identifier
        - sku:
            terms:
              - SKU of the Order Line
              - Product Code

  - Order:
      terms:
        - Order
        - Purchase Order
      properties:
        - orderId:
            terms:
              - Order Id of the Order
              - Order Number
        - orderlines:
            terms:
              - Orderlines of the Order
              - Line Items

  - Address:
      terms:
        - Address
      properties:
        - street:
            terms:
              - Street of the Address
        - city:
            terms:
              - City of the Address
        - zip:
            terms:
              - Zip of the Address

  - SSN:
      terms:
        - SSN
        - Social Security Number

  - Person:
      terms:
        - Person
      properties:
        - ssn:
            terms:
              - SSN of the Person
        - givenName:
            terms:
              - Given Name of the Person

  - LoyaltyStatus:
      terms:
        - Loyalty Status
      properties:
        - level:
            terms:
              - Level of the Loyalty Status

  - Color:
      terms:
        - Color
      properties:
        - RED:
            terms:
              - RED of the Color
        - GREEN:
            terms:
              - GREEN of the Color
        - BLUE:
            terms:
              - BLUE of the Color
        - PINK:
            terms:
              - PINK of the Color
        - BLACK:
            terms:
              - BLACK of the Color
        - WHITE:
            terms:
              - WHITE of the Color

  - Preferences:
      terms:
        - Preferences
      properties:
        - favoriteColors:
            terms:
              - Favorite Colors of the Preferences

  - TemplateData:
      terms:
        - Template Data
      properties:
        - firstName:
            terms:
              - First Name of the Template Data
        - lastName:
            terms:
              - Last Name of the Template Data
        - middleNames:
            terms:
              - Middle Names of the Template Data
        - active:
            terms:
              - Active of the Template Data
        - lastVisit:
            terms:
              - Last Visit of the Template Data
        - address:
            terms:
              - Address of the Template Data
        - orders:
            terms:
              - Orders of the Template Data
        - loyaltyStatus:
            terms:
              - Loyalty Status of the Template Data
        - preferences:
            terms:
              - Preferences of the Template Data
