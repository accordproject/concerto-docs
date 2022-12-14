---
id: codegen-openapi
title: Open API
---

The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to RESTful APIs.

```base
concerto compile --model test.cto --target openapi
```

## Sample Output

> Note that only identifiable concepts with the `@resource` decorator are exposed as REST paths.

```
{
  "openapi": "3.0.2",
  "servers": [],
  "info": {
    "title": "Generated Open API from Concerto Models",
    "version": "1.0.0"
  },
  "components": {
    "schemas": {
      "test@1.0.0.Person": {
        "title": "Person",
        "description": "An instance of test@1.0.0.Person",
        "type": "object",
        "properties": {
          "$class": {
            "type": "string",
            "default": "test@1.0.0.Person",
            "pattern": "^test@1\\.0\\.0\\.Person$",
            "description": "The class identifier for this type"
          },
          "email": {
            "type": "string",
            "description": "The instance identifier for this type"
          },
          "dob": {
            "format": "date-time",
            "type": "string"
          }
        },
        "required": [
          "$class",
          "email"
        ],
        "$decorators": {
          "resource": []
        }
      }
    }
  },
  "paths": {
    "/people": {
      "summary": "Path used to manage the list of people.",
      "description": "The REST endpoint/path used to list and create zero or more `person` entities.  This path contains a `GET` and `POST` operation to perform the list and create tasks, respectively.",
      "get": {
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/test@1.0.0.Person"
                  }
                }
              }
            },
            "description": "Successful response - returns an array of `person` entities."
          }
        },
        "operationId": "listPeople",
        "summary": "List All People",
        "description": "Gets a list of all `person` entities."
      },
      "post": {
        "requestBody": {
          "description": "A new `person` to be created.",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/test@1.0.0.Person"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful response."
          }
        },
        "operationId": "createPerson",
        "summary": "Create a Person",
        "description": "Creates a new instance of a `person`."
      }
    },
    "/people/{email}": {
      "summary": "Path used to manage a single person.",
      "description": "The REST endpoint/path used to get, update, and delete single instances of a `person`.  This path contains `GET`, `PUT`, and `DELETE` operations used to perform the get, update, and delete tasks, respectively.",
      "get": {
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/test@1.0.0.Person"
                }
              }
            },
            "description": "Successful response - returns a single `person`."
          }
        },
        "operationId": "getPerson",
        "summary": "Get a person",
        "description": "Gets the details of a single instance of a `person`."
      },
      "put": {
        "requestBody": {
          "description": "Updated `person` information.",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/test@1.0.0.Person"
              }
            }
          },
          "required": true
        },
        "responses": {
          "202": {
            "description": "Successful response."
          }
        },
        "operationId": "replacePerson",
        "summary": "Update a person",
        "description": "Updates an existing `person`."
      },
      "delete": {
        "responses": {
          "204": {
            "description": "Successful response."
          }
        },
        "operationId": "deletePerson",
        "summary": "Delete a person",
        "description": "Deletes an existing `person`."
      },
      "parameters": [
        {
          "name": "email",
          "description": "A unique identifier for a `Person`.",
          "schema": {
            "type": "string"
          },
          "in": "path",
          "required": true
        }
      ]
    }
  }
}
```

## Options

Add the `@resource` decorator to all identifiable concepts that are to be exposed on RESTful paths.

To override the name of the resource pass the name as the first argument to the `@resource` decorator. E.g.

```
@resource("customname")
```

To override the pluralized name of the resource pass the pluralized name as the second argument to the `@resource` decorator. E.g.

```
@resource("customname", "customplural")
```

## Limitations

1. Scalars are unboxed as properties