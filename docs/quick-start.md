---
sidebar_position: 3
---

# Quick Start

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Install the Concerto Command Line Interface (CLI)

Open a shell and run the command:

```bash
npm install -g @accordproject/concerto-cli
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run the Concerto CLI.

## Test your install

Run the CLI help command:

```bash
concerto --help
```

If Concerto has been successfully installed you will see output like this:

```bash
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

Options:
      --version  Show version number                                   [boolean]
  -v, --verbose                                                 [default: false]
      --help     Show help                                             [boolean]
```

## Create your first Concerto model

> Note, if you use the VSCode IDE you can install the [Accord Project (Concerto) extension](./vscode.md) to benefit from syntax highlighting, compilation, and more.

Open a code or text editor and create a plain text file, with the contents:

```concerto
namespace test@1.0.0

concept Person identified by email {
  o String email
  o DateTime dob
}
```

Save the file as `test.cto`.

## Generate a sample instance of the model

Run the Concerto CLI `generate sample` command to generate an instance of the `test@1.0.0.Person` concept:

```base
concerto generate sample --model test.cto --concept test@1.0.0.Person
```

The output should be similar to:

```
{
  "$class": "test@1.0.0.Person",
  "email": "resource1",
  "dob": "2022-12-13T10:46:46.109Z"
}
```

Save this output as `person.json`.

## Validate data using your data model

Modify `person.json` to remove the `dob` property and save the file:

```base
{
  "$class": "test@1.0.0.Person",
  "email": "resource1",
}
```

Run the CLI command:

```bash
concerto validate --input person.json --model test.cto 
```

The output should be:

```base
10:50:57 - INFO: Input is invalid
10:50:57 - ERROR: The instance "test@1.0.0.Person#resource1" is missing the required field "dob".
```

Indicating that the `person.json` instance of `test@1.0.0.Person` is invalid with respect to the model.

Now modify `test.cto` to declare that the `dob` property is optional:

```concerto
namespace test@1.0.0

concept Person identified by email {
  o String email
  o DateTime dob optional
}
```

Rerun the `validate` command:

```bash
concerto validate --input person.json --model test.cto 
```

The output should now be:

```bash
10:53:43 - INFO: Input is valid
{"$class":"test@1.0.0.Person","email":"resource1"}
```

## Congratulations!

Well done, you've created your first Concerto model and used the CLI to validate data against the model! This is just the start... 

Please refer to the other tutorials for more advanced scenarios and for details on the Concerto API.
