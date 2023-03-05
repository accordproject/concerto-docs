---
id: api-js-imports-from-url
title: Imports for URL
---

# Defining Models Using Import from URL

Concero models can be imported from a publicly accessible URL.

[Run this code on replit](https://replit.com/@dselman/AccordProjectConcerto-Imports-From-URL)

```js
const { ModelManager, Concerto } = require('@accordproject/concerto-core');

try {
  // create the model manager, used to manage a consistent set of
  // related models
  const mm = new ModelManager();

  // add a CTO file (as a string) to the model manager
  // note that this model file imports the MonetaryAmount type from 
  // a model that is loaded from a URL.
  // we therefore pass 'true' as the third argument to disable
  // consistency checks on imports
  mm.addCTOModel(`namespace catalog@1.0.0

  import org.accordproject.money@0.3.0.{MonetaryAmount} from https://models.accordproject.org/money@0.3.0.cto

concept Product identified by sku
{
	o String name
  o String sku
	o MonetaryAmount price
}`, 'product.cto', true);

  // we then call `updateExternalModels` to download all external
  // models, which will also verify the consistency of the model manager
  mm.updateExternalModels();

  // we can now retrieve a type and property from the model manager
  const productType = mm.getType('catalog@1.0.0.Product');
  console.log(productType.getProperty('price').toString());
}
catch (err) {
  console.log(err)
}
```
