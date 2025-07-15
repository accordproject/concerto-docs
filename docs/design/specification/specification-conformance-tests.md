# Concerto Conformance test suite
## About
The Concerto Conformance Test Suite is a cross-language validation tool designed to test the semantic correctness of Accord Project's Concerto modeling language. It ensures that any modifications to core components like the Parser, ModelFile, or ModelManager continue to comply with a defined set of semantic validation rules.
It currently supports JavaScript, with the ability to test across multiple implementations of Concerto.
It will also be supporting C# in future.
## What it does?
1. **Defines Semantic Rules**:
    a. Tests a wide range of semantic validations such as:
    b. Property and class naming rules
    c. Namespace conflicts
    d. Invalid enum definitions
    e. Incorrect import structures
       And more can be found here: https://github.com/accordproject/concerto-conformance/tree/main/semantic/features

2. **Provides Valid & Invalid Models**:
Maintains model files that are both syntactically and semantically correct or incorrect — which are used as test fixtures.

3. **Runs Tests Using Cucumber**:
Test logic is implemented using Cucumber (.feature files + step definitions) for human-readable test cases and structured validations.

4. **Supports Dynamic Source Loading**:
Uses a dynamic loader to import target implementations of Parser, ModelFile, and ModelManager via environment variables or default npm packages.

5. **CI/CD Integration Ready**:
Can be integrated into the CI/CD pipeline of any target project to run conformance tests automatically on each commit/PR.

## Why it's needed?
Maintaining a language like Concerto involves frequent updates to its core features like parser, modelmanager and modelfile. As new features or changes are introduced, it's crucial to ensure:
1. No unintended behavior are introduced
2. Core semantic rules continue to be enforced consistently
3. Contributions from the community don't accidentally break conformance.