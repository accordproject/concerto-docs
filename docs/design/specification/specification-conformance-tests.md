# Concerto Conformance test suite
## About
The Concerto Conformance Test Suite is a cross-language validation tool designed to test the semantic correctness of Accord Project's Concerto modeling language. It ensures that any modifications to core components like the Parser, ModelFile, or ModelManager continue to comply with a defined set of semantic validation rules.
It currently supports JavaScript, with the ability to test across multiple implementations of Concerto such as Rust, C# and many others.
For running conformance tests against implementations of Concerto in different languages you only need the step file in the respective language.

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


# Semantic Validation Rules:

| Rule Name | Description |
|-----------|-------------|
| CLASS_DECLARATION_001 | No property name should be a system property |
| CLASS_DECLARATION_002 | Property $class should be a property type from the metamodel |
| CLASS_DECLARATION_003 | Name of declaration should not be duplicated within the same model file |
| CLASS_DECLARATION_004 | If declaration has a super type it must exist |
| CLASS_DECLARATION_005 | If declaration has an identifying field it must have a corresponding String or String scalar property |
| CLASS_DECLARATION_006 | Identifying fields cannot be optional |
| CLASS_DECLARATION_007 | If system identified then the super type must also be system identified |
| CLASS_DECLARATION_008 | Check that property does not already exist in super types |
| CLASS_DECLARATION_009 | No circular inheritance should be present |
| CLASS_DECLARATION_010 | unique_property_from_super.cto |
| DECLARATION_001 | Check name are unique within model file |
| DECLARATION_002 | Check declared name is not also an imported type |
| DECORATED_001 | Check decorator is not applied more than once |
| MAP_KEY_TYPE_001 | Key type must be a String or DateTime, or a scalar thereof |
| MAP_VALUE_TYPE_001 | Value type must exist |
| MODEL_ELEMENT_002 | name must be a valid identifier ModelUtil.isValidIdentifier(this.ast.name) |
| MODEL_FILE_001 | All imports must reference types that exist |
| MODEL_FILE_002 | Cannot import two versions of the same namespace |
| NUMBER_VALIDATOR_001 | Cannot have no upper bound and no lower bound |
| NUMBER_VALIDATOR_002 | Lower bound must not be greater than upper bound |
| NUMBER_VALIDATOR_003 | valid_range_type |
| PROPERTY_002 | The type of a non-primitive property must exist |
| PROPERTY_003 | Property meta type must exist in the metamodel |
| RELATIONSHIP_001 | Relationships cannot be to primitive types |
| RELATIONSHIP_002 | Relationship type must exist |
| RELATIONSHIP_003 | Relationship must be to an identified type |
| STRING_VALIDATOR_001 | Cannot have no upper and no lower bound |
| STRING_VALIDATOR_002 | Upper and lower bound must be positive integers |
| STRING_VALIDATOR_003 | Lower bound cannot be greater than upper bound |
| STRING_VALIDATOR_004 | If regex defined it must be valid |

## Why it's needed?
Maintaining a language like Concerto involves frequent updates to its core features like parser, modelmanager and modelfile. As new features or changes are introduced, it's crucial to ensure:
1. No unintended behavior are introduced
2. Core semantic rules continue to be enforced consistently
3. Contributions from the community don't accidentally break conformance.