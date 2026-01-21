---
id: vocabulary
title: Vocabulary
sidebar_position: 5
---


The Vocabulary module for Concerto optionally allows human-readable labels (Terms) to be associated with model elements. Terms are stored within a locale-specific vocabulary YAML file associated with a Concerto namespace.

For example, a Concerto model that defines an enumeration with the values `RED`, `GREEN`, `BLUE` can be associated with an English vocabulary with the terms "Red", "Green", "Blue" and a French Vocabulary with terms "Rouge", "Vert", "Bleue".

The `VocabularyManager` class manages access to a set of Vocabulary files and includes logic to retrieve the most appropriate term for a requested locale. 

Additionally, it now supports associating multiple terms with the same concept or property, allowing for use cases such as short descriptions, long descriptions, tooltips, and more.

### Example Model

```
namespace org.acme

enum Color {
    o RED
    o BLUE
    o GREEN
}

asset Vehicle identified by vin {
    o String vin
    o Color color
}

asset Truck extends Vehicle {
    o Double weight
}
```

### Example Vocabulary Files

#### English - en

``` yaml
locale: en
namespace: org.acme
declarations:
  - Color:
      terms:
        short: "A color"
        long: "A color representing a visible wavelength of light."
  - Vehicle:
      terms:
        short: "A road vehicle"
        long: "A machine used for transporting people or goods."
      properties:
        - vin:
            terms:
              short: "VIN"
              tooltip: "Vehicle Identification Number"
        - model:
            terms:
              short: "Model"
              tooltip: "Model of the vehicle"
  - Truck:
      terms:
        short: "A truck"
        tooltip: "A vehicle capable of carrying cargo"
      properties:
        - weight:
            terms:
              short: "Weight"
              long: "The weight of the truck in kilograms."
```

#### British English - en-gb

``` yaml
ocale: en-gb
namespace: org.acme
declarations:
  - Truck:
      terms:
        short: "A lorry"
        tooltip: "A lorry capable of carrying cargo."
  - Color:
      terms:
        short: "A colour"
        long: "A hue or shade of light visible to the eye."
  - Milkfloat:
      terms:
        short: "A milk float"
        tooltip: "An electric vehicle used for delivering milk."
```

#### French - fr

```yaml
locale: fr
namespace: org.acme
declarations:
  - Vehicle:
      terms:
        short: "Véhicule"
        long: "Un moyen de transport routier."
      properties:
        - vin:
            terms:
              short: "NIV"
              tooltip: "Numéro d'identification du véhicule"
```

#### Simplified Chinese zh-cn

```yaml
locale: zh-cn
namespace: org.acme
declarations:
  - Color:
      terms:
        short: "颜色"
        long: "一种可见光的波长。"
      properties:
        - RED:
            terms:
              short: "红色"
              tooltip: "一种颜色的名字"
        - GREEN:
            terms:
              short: "绿色"
        - BLUE:
            terms:
              short: "蓝色"
  - Vehicle:
      terms:
        short: "车辆"
        long: "一种用于运输人或货物的机器。"
      properties:
        - vin:
            terms:
              short: "车辆识别号"
```

As you can see in the vocabularies above, a vocabulary can supplement or override terms from a base vocabulary, as is the case of the `en-gb` vocabulary which redefines and adds terms specific to British English over the generic English `en` vocabulary.

In addition to the default `@Term` annotation, the `@Term_{vocabularyKey}` annotation allows you to define terms using custom vocabulary keys, supporting multiple alternative vocabularies.

To avoid conflicts in the generated vocabulary YAML, the following keys are restricted:

```
Namespace level: "namespace", "locale", "declarations"
Declaration level: "properties", declaration’s own name (e.g., Vehicle, Color)
Property level: property's own name (e.g., vin, weight)
```

## Creating a boostrap Vocabulary file

Use the following command to generate a bootstrap Vocabulary file in English Language. This file will give a boilerplate format for the Vocabulary YAML file. This file can be edited to any description that is required or any language that is required.

```
concerto compile --model test.cto --target vocabulary
```

Please refer to [Vocabulary Code Generation](/docs/reference/codegen/vocabulary.md) for more information.

## API Usage

Use the `VocabularyManager` classs to define new vocabularies, retrieve terms for a locale, or to validate a vocabulary using a `ModelManager`.

### Adding a Vocabulary

Load the YAML file for the Vocabulary and add it to a `VocabularyManager`:

```
const VocabularyManager = require('concerto-vocabulary');
const fs = require('fs');

vocabularyManager = new VocabularyManager();
const enVocString = fs.readFileSync('./test/org.acme_en.voc', 'utf-8');
vocabularyManager.addVocabulary(enVocString);
```

### Retrieving a Term

Use the `getTerm` method on the `VocabularyManager` to retrieve a term for
a declaration or property within a namespace:

```
const shortTerm = vocabularyManager.getTerm('org.acme', 'en-gb', 'Color', { termType: 'short' });
// shortTerm.should.equal('A colour');

```

```
const tooltip = vocabularyManager.getTerm('org.acme', 'en', 'Vehicle', 'vin', { termType: 'tooltip' });
// tooltip.should.equal('Vehicle Identification Number');

```

### Resolve a Term using ModelManager Type Hierarchy

The `resolveTerm` method on the `VocabularyManager` may be used to lookup a term
based on the type hierarchy defined by a `ModelManager`. In the example below, the property
`vin` is not defined on the `Truck` declaration but rather on the `Vehicle` super-type.

```
modelManager = new ModelManager();
const model = fs.readFileSync('./test/org.acme.cto', 'utf-8');
modelManager.addModelFile(model);
const term = vocabularyManager.resolveTerm(modelManager, 'org.acme', 'en-gb', 'Truck', 'vin', { termType: 'tooltip' });
// term.should.equal('Vehicle Identification Number');
```

### Validating a Vocabulary Manager

Use the `validate` method on the `VocabularyManager` to detect missing and redudant vocabulary 
terms — comparing the terms in the `VocabularyManager` with the declarations in a `ModelManager`.
The return value from `validate` is an object containing information for the missing and additional terms. 

> Note that allowing vocabularies to evolve independently of their associated namespace provides definition and translation workflow flexibility.

```
const result = vocabularyManager.validate(modelManager);
// result.missingVocabularies.length.should.equal(1);
// result.missingVocabularies[0].should.equal('org.accordproject');
// result.additionalVocabularies.length.should.equal(1);
// result.additionalVocabularies[0].getNamespace().should.equal('com.example');
// result.vocabularies['org.acme/en'].additionalTerms.should.have.members(['Vehicle.model']);
// result.vocabularies['org.acme/en'].missingTerms.should.have.members(['Color.RED', 'Color.BLUE', 'Color.GREEN', 'Vehicle.color']);
// result.vocabularies['org.acme/en-gb'].additionalTerms.should.have.members(['Milkfloat']);
// result.vocabularies['org.acme/fr'].missingTerms.should.have.members(['Color', 'Vehicle.color', 'Truck']);
// result.vocabularies['org.acme/fr'].additionalTerms.should.have.members([]);
// result.vocabularies['org.acme/zh-cn'].missingTerms.should.have.members(['Truck']);
// result.vocabularies['org.acme/zh-cn'].additionalTerms.should.have.members([]);
```
By allowing multiple terms for concepts and properties, Concerto now supports advanced use cases such as multilingual tooltips, detailed descriptions, and more intuitive application interfaces.

Please refer to the [JavaScript API](/docs/reference/api/ref-concerto-js-api) for the `concerto-vocabulary` module for detailed API guidance.
