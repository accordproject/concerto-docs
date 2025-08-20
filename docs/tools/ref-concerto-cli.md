---
id: ref-concerto-cli
title: Command Line
sidebar_position: 9
---

Install the `@accordproject/concerto-cli` npm package to access the Concerto command line interface (CLI). After installation you can use the `concerto` command and its sub-commands as described below.

To install the Concerto CLI:
```
npm install -g @accordproject/concerto-cli
```

## Usage

```md
concerto <cmd> [args]

Commands:
  concerto validate           validate JSON against model files
  concerto compile            generate code for a target platform
  concerto get                save local copies of external model dependencies
  concerto parse              parse a cto string to a JSON syntax tree
  concerto print              print a JSON syntax tree to a cto string
  concerto version <release>  modify the version of one or more model files
  concerto compare            compare two Concerto model files
  concerto infer              generate a concerto model from a source schema
  concerto generate <mode>    generate a sample JSON object for a concept
  concerto decorate           apply the decorators and vocabs to the target models from given list of dcs files and vocab files
  concerto extract-decorators extract the decorator command sets and vocabularies from a list of model files
  concerto convert-dcs        convert decorator command set between JSON and YAML formats

Options:
      --version  Show version number                                   [boolean]
  -v, --verbose                                                 [default: false]
      --help     Show help                                             [boolean]
```

## concerto validate
`concerto validate` lets you check whether a JSON sample is a valid instance of the given model.

```md
concerto validate

validate JSON against model files

Options:
      --version     Show version number                                [boolean]
  -v, --verbose                                                 [default: false]
      --help        Show help                                          [boolean]
      --input       JSON to validate                                    [string]
      --model       array of concerto model files                        [array]
      --utcOffset   set UTC offset                                      [number]
      --offline     do not resolve external models    [boolean] [default: false]
      --functional  new validation API                [boolean] [default: false]
```

### Example
For example, using the `validate` command to check the sample `request.json` file from a [Late Delivery and Penalty](https://github.com/accordproject/cicero-template-library/tree/master/src/latedeliveryandpenalty) clause:

```
concerto validate --input request.json --model model/clause.cto
```

returns:

```json
{
  "$class": "org.accordproject.latedeliveryandpenalty.LateDeliveryAndPenaltyRequest",
  "forceMajeure": false,
  "agreedDelivery": "2017-12-17T04:24:00.000-04:00",
  "goodsValue": 200,
  "$timestamp": "2021-06-17T09:41:54.207-04:00"
}
```

## concerto compile
`concerto compile` takes an array of local CTO files, downloads any external dependencies (imports) and then converts all the model to the target format.

```md
concerto compile

generate code for a target platform

Options:
      --version            Show version number                         [boolean]
  -v, --verbose                                                 [default: false]
      --help               Show help                                   [boolean]
      --model              array of concerto model files   [array] [default: []]
      --offline            do not resolve external models
                                                      [boolean] [default: false]
      --target             target of the code generation
                                                [string] [default: "JSONSchema"]
      --output             output directory path [string] [default: "./output/"]
      --metamodel          Include the Concerto Metamodel in the output
                                                      [boolean] [default: false]
      --strict             Require versioned namespaces and imports
                                                      [boolean] [default: false]
      --useSystemTextJson  Compile for System.Text.Json library (`csharp` target
                           only)                      [boolean] [default: false]
      --useNewtonsoftJson  Compile for Newtonsoft.Json library (`csharp` target
                           only)                      [boolean] [default: false]
      --namespacePrefix    A prefix to add to all namespaces (`csharp` target
                           only)                                        [string]
      --pascalCase         Use PascalCase for generated identifier names
                                                       [boolean] [default: true]
```

At the moment, the available target formats are as follows:
- Go Lang: `concerto compile --model modelfile.cto --target Golang`
- JSONSchema: `concerto compile --model modelfile.cto --target JSONSchema`
- XMLSchema: `concerto compile --model modelfile.cto --target XMLSchema`
- Plant UML: `concerto compile --model modelfile.cto --target PlantUML`
- Typescript: `concerto compile --model modelfile.cto --target Typescript`
- Java: `concerto compile --model modelfile.cto --target Java`
- GraphQL: `concerto compile --model modelfile.cto --target GraphQL`
- CSharp: `concerto compile --model modelfile.cto --target CSharp`
- OData: `concerto compile --model modelfile.cto --target OData`
- Mermaid: `concerto compile --model modelfile.cto --target Mermaid`
- Markdown: `concerto compile --model modelfile.cto --target Markdown`
- Rust: `concerto compile --model modelfile.cto --target Rust`
- Vocabulary: `concerto compile --model modelfile.cto --target Vocabulary`

### Example
For example, using the `compile` command to export the `clause.cto` file from a [Late Delivery and Penalty](https://github.com/accordproject/cicero-template-library/tree/master/src/latedeliveryandpenalty) clause into `Go Lang` format:

```md
cd ./model
concerto compile --model clause.cto --target Golang
```

returns:
```md
info: Compiled to Go in './output/'.
```

## concerto get
`concerto get` allows you to resolve and download external models from a set of local CTO files.

```md
concerto get

save local copies of external model dependencies

Options:
      --version  Show version number                                   [boolean]
  -v, --verbose                                                 [default: false]
      --help     Show help                                             [boolean]
      --model    array of concerto (cto) model files          [array] [required]
      --output   output directory path                  [string] [default: "./"]
```

### Example
For example, using the `get` command to get the external models in the `clause.cto` file from a [Late Delivery and Penalty](https://github.com/accordproject/cicero-template-library/tree/master/src/latedeliveryandpenalty) clause:

```md
concerto get --model clause.cto
```

returns:
```md
info: Loaded external models in './'.
```

## concerto parse
`concerto parse` allows you to parse a set of CTO models to their JSON representation (metamodel).

```md
parse a cto string to a JSON syntax tree

Options:
      --version               Show version number                      [boolean]
  -v, --verbose                                                 [default: false]
      --help                  Show help                                [boolean]
      --model                 array of concerto model files   [array] [required]
      --resolve               resolve names to fully qualified names
                                                      [boolean] [default: false]
      --all                   import all models       [boolean] [default: false]
      --output                path to the output file                   [string]
      --excludeLineLocations  Exclude file line location metadata from metamodel
                              instance                [boolean] [default: false]
```

## concerto print
`concerto print` allows you to convert a model in JSON metamodel format to a CTO string.

```md
concerto print

print a JSON syntax tree to a cto string

Options:
      --version  Show version number                                   [boolean]
  -v, --verbose                                                 [default: false]
      --help     Show help                                             [boolean]
      --input    the metamodel to export                     [string] [required]
      --output   path to the output file                                [string]
```

## concerto version
`concerto version` allows you to modify the version of one or more model files

```md
concerto version <release>

modify the version of one or more model files

Positionals:
  release  the new version, or a release to use when incrementing the existing
           version
    [string] [required] [choices: "keep", "major", "minor", "patch", "premajor",
                                           "preminor", "prepatch", "prerelease"]

Options:
      --version          Show version number                           [boolean]
  -v, --verbose                                                 [default: false]
      --help             Show help                                     [boolean]
      --model, --models  array of concerto model files        [array] [required]
      --prerelease       set the specified pre-release version          [string]
```

## concerto compare
`concerto compare` allows you to compare two model files

```md
concerto compare

compare two Concerto model files

Options:
      --version  Show version number                                   [boolean]
  -v, --verbose                                                 [default: false]
      --help     Show help                                             [boolean]
      --old      the old Concerto model file                 [string] [required]
      --new      the new Concerto model file                 [string] [required]
```

## concerto infer
`concerto infer` allows you to generate a Concerto model from a source schema such as JSON Schema or an OpenAPI definition.

```md
concerto infer

generate a concerto model from a source schema

Options:
      --version          Show version number                       [boolean]
  -v, --verbose                                             [default: false]
      --help             Show help                                 [boolean]
      --input            path to the input file          [string] [required]
      --output           path to the output file                    [string]
      --format           either `openapi` or `jsonSchema`
                                            [string] [default: "jsonSchema"]
      --namespace        The namespace for the output model
                                                         [string] [required]
      --typeName         The name of the root type[string] [default: "Root"]
      --capitalizeFirst  Capitalize the first character of type names
                                                  [boolean] [default: false]
```

### Example
```console
concerto infer --namespace com.example.restapi --format openapi --input example.swagger.json --output example.cto 
```

## concerto generate
`concerto generate` allows you to generate a sample instance for a type in a model

```md
concerto generate <mode>

generate a sample JSON object for a concept

Positionals:
  mode  Generation mode. `empty` will generate a minimal example, `sample` will
        generate random values  [string] [required] [choices: "sample", "empty"]

Options:
      --version                Show version number                     [boolean]
  -v, --verbose                                                 [default: false]
      --help                   Show help                               [boolean]
      --model                  The file location of the source models
                                                              [array] [required]
      --concept                The fully qualified name of the Concept type to
                               generate                      [string] [required]
      --includeOptionalFields  Include optional fields will be included in the
                               output                 [boolean] [default: false]
      --metamodel              Include the Concerto Metamodel in the output
                                                      [boolean] [default: false]
      --strict                 Require versioned namespaces and imports
                                                      [boolean] [default: false]
```

## concerto decorate
`concerto decorate` allows you to apply decorators and vocabularies to a list of models
```md
concerto decorate
apply the decorators and vocabs to the target models from given list of dcs files and vocab files
Options:
      --models                 The file location of the source models
                                                              [array] [required]
      --decorator              The file location of decorators to be applied
                                                                         [array]
      --vocabulary             The file location of vocabularies to be applied
                                                                         [array]
      --format                 The output format for models (cto or json)
                                                         [string] [default: cto]
      --output                 The output directory path where you want your
                               generated models to be stored
                                                                        [string]
```

## concerto extract-decorators
`concerto extract-decorators` allows you to extract the decorator command sets and vocabularies from a list of model files and optionally remove those decorators from source models.
```md
concerto extract-decorators
apply the decorators and vocabs to the target models from given list of dcs files and vocab files
Options:
      --models                      The file location of the source models
                                                              [array] [required]
      --locale                      The locale for extracted vocabularies
                                                          [string] [default: en]
      --removeDecoratorsFromSource  The flag to determine whether to remove
                                    decorators from source
                                                       [boolean] [default: false]
      --output                 The output directory path where you want your
                               generated models to be stored
                                                        [string] [default :output]
```

## concerto convert-dcs
`concerto convert-dcs` allows you to convert Decorator Command Set files between JSON and YAML formats.

```md
concerto convert-dcs

convert decorator command set between JSON and YAML formats

Options:
      --version  Show version number                                   [boolean]
  -v, --verbose                                                 [default: false]
      --help     Show help                                             [boolean]
      --dcs      The input DCS file (.json or .yaml/.yml)    [string] [required]
      --output   The output file path (.json or .yaml/.yml). If not provided,
                 outputs to console                                     [string]
```

The command automatically detects the input format based on the file extension and converts to the opposite format:
- `.json` files are converted to YAML format
- `.yaml` or `.yml` files are converted to JSON format

### Example
Convert a JSON decorator command set to YAML:

```
concerto convert-dcs --dcs dcs.json --output dcs.yml
```

Convert a YAML decorator command set to JSON:

```
concerto convert-dcs --dcs dcs.yaml --output dcs.json
```

If no output file is specified, the converted content will be written to console:

```
concerto convert-dcs --dcs dcs.json
```
