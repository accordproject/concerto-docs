---
id: contributing
title: Contributing
sidebar_position: 10
---

We love Open Source contributions; whether they be [fixes to this documentation](https://github.com/accordproject/concerto-docs), or [Concerto bug reports, feature requests, or code contributions](https://github.com/accordproject/concerto).

Financial contributions are also very welcome and can be made to Accord Project, via the [Linux Foundation Crowdfunding portal](https://crowdfunding.lfx.linuxfoundation.org/projects/accordproject).

## Structure of the Code

Top level repository (concerto), with sub packages. Each sub-package is published as an independent npm module using `lerna`:

* [concerto-core](https://github.com/accordproject/concerto/tree/master/packages/concerto-core) : core library for model management/parsing/validation/serialization
* [concerto-util](https://github.com/accordproject/concerto/tree/master/packages/concerto-util) : contains utility functions used in other parts of the code and fundamentally independent from Concerto as a modeling language
* [concerto-cto](https://github.com/accordproject/concerto/tree/master/packages/concerto-cto) : contains the parser for the .cto syntax for Concerto. The parser now outputs a proper Concerto object, instance of the metamodel rather than a custom JSON object.
* [concerto-vocabulary](https://github.com/accordproject/concerto/tree/master/packages/concerto-vocabulary) : functionality to handle model vocabularies and localization
* [concerto-analysis](https://github.com/accordproject/concerto/tree/master/packages/concerto-analysis) : tools for comparing model files
* [concerto-types](https://github.com/accordproject/concerto/tree/master/packages/concerto-types) : TypeScript type definitions for Concerto
* [concerto-dotnet](https://github.com/accordproject/concerto-dotnet) : .NET type definitions for Concerto, and serialization tools

Independent repositories for the following packages:
* [concerto-cli](https://github.com/accordproject/concerto-cli) : command-line interface for Concerto
* [concerto-codegen](https://github.com/accordproject/concerto-codegen) : model converters and tools for Concerto model files
* [concerto-metamodel](https://github.com/accordproject/concerto-metamodel) : contains utility functions for accessing and manipulating the Concerto metamodel
