# Day 2: Predicates

- Using predicates to send different responses for different requests
- Simplifying predicates on JSON request bodies
- Using XPath to simplify predicates on XML request bodies

## The basic of predicates

How Mountebank matches the request against each stub's predicates?

![pic](../images/predicates.png)

## HTTP Shopping Cart

```txt
POST /products?page=2&itemsPerPage=2 HTTP/1.1
Host: api.petstore.com
Content-Type: application/json

{
  "key": "asdul7890"
}
```

- Path
- HTTP Method
- HTTP Header
- Query
- Body
  - Plan Text
  - JSON
  - XML

## Type of Predicates

### The matches predicates

> matches-predicate.json

```json
{
  "protocol": "http",
  "port": 3000,
  "stubs": [
    {
      "predicates": [
        { "equals": { "method": "POST" } },
        { "startsWith": { "body": "smart" } },
        { "endsWith": { "body": "robot" } }
      ],
      "responses": [
        {
          "is": {
            "body": "Hello, smart robot"
          }
        }
      ]
    }
  ]
}
```

> Mountebank matches

```json
{
  "predicates": [
    { "startsWith": { "body": "smart" } },
    { "contains": { "body": "alpha3" } },
    { "endsWith": { "body": "robot" } }
  ]
}
```

> match with regular expressions

```json
{
  "predicates": [
    { "matches": { "body": "^text to match" } },
    { "matches": { "body": ".*text to match.*" } },
    { "matches": { "body": "text to match$" } }
  ]
}
```

### Matching any identifier on the path

> path-identifier-predicate.json

```json
{
  "protocol": "http",
  "port": 3000,
  "stubs": [
    {
      "predicates": [
        {
          "matches": { "path": "/items/\\d+" }
        }
      ],
      "responses": [
        {
          "is": {
            "body": {
              "name": "43 Piece Dinner Set",
              "price": 12.95,
              "quantity": 10
            }
          }
        }
      ]
    }
  ]
}
```

The metacharacters used here, \d+, represent one or more digits, so the pattern will match /items/123 and /items/2 but not items/robot.

### Matching object request fields

> request-field-predicate.json

```json
{
  "protocol": "http",
  "port": 3000,
  "stubs": [
    {
      "predicates": [
        {
          "equals": {
            "query": { "q": "robot" }
          }
        }
      ],
      "responses": [
        {
          "is": {
            "body": {
              "items": [
                {
                  "name": "TA Robot",
                  "price": 109.99,
                  "quantity": 50
                },
                {
                  "name": "AlphaBot2",
                  "price": 71.0,
                  "quantity": 73
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
```

### The deep equals predicate

> deep-equals-predicate.json

```json
{
  "deepEquals": {
    "query": {
      "q": "robot",
      "page": 1
    }
  }
}
```

With this predicate, a query string of ?q=robot&page=1 would match, but a query string of ?q=robot&page=1&sort=desc wouldn’t.

### Matching multivalued fields

> GET /items?q=smart&q=robot

> multivalued-field-predicate-01.json

> requires exact match

```json
{
  "predicates": [
    {
      "deepEquals": {
        "query": { "q": ["smart", "robot"] }
      }
    }
  ]
}
```

> GET /items?q=smart&q=robot

> multivalued-field-predicate-02.json

> requires these elements to be present

```json
{
  "predicates": [
    {
      "equals": {
        "query": { "q": ["smart", "robot"] }
      }
    }
  ]
}
```

### The exists predicate

There’s one more primitive predicate to look at. The exists predicate tests for either the existence or nonexistence of a request field.  
For example, you may decide that for testing purposes, you want to verify that the service handles an HTTP challenge correctly (represented by a 401 sta- tus code) when the Authorization request header is missing, without worrying about whether the credentials stored in the Authorization header are correct, as shown here:

> exists-predicate.json

```json
{
  "predicates": [
    {
      "exists": {
        "headers": { "Authorization": false }
      }
    }
  ],
  "responses": [
    {
      "is": { "statusCode": 401 }
    }
  ]
}
```

### Conjunction junction

> conjunction-without-and-predicate.json

```json
{
  "predicates": [
    { "startsWith": { "body": "smart" } },
    { "endsWith": { "body": "robot" } }
  ]
}
```

You can reduce the array to a single element by using the and predicate.

> conjunction-with-and-predicate.json

```json
{
  "predicates": [
    {
      "and": [
        { "startsWith": { "body": "smart" } },
        { "endsWith": { "body": "robot" } }
      ]
    }
  ]
}
```

### A complete list of predicate types

| Operator   | Description                                                                                |
| ---------- | ------------------------------------------------------------------------------------------ |
| equals     | Requires the request field to equal the predicate value                                    |
| deepEquals | Performs nested set equality on object request fields                                      |
| contains   | Requires the request field to contain the predicate value                                  |
| startsWith | Requires the request field to start with the predicate value                               |
| endsWith   | Requires the request field to end with the predicate value                                 |
| Matches    | Requires the request field to match the regular expression provided as the predicate value |
| exists     | Requires the request field to exist as a nonempty value (if true) or not (if false)        |
| not        | Inverts the subpredicate                                                                   |
| or         | Requires any of the subpredicates to be satisfied                                          |
| and        | Requires all of the subpredicates to be satisfied                                          |

---

## Parameterizing predicates

Predicates are case-insensitive by default.

### Making case-sensitive predicates

> case-sensitive-predicate.json

```json
{
  "predicates": [
    {
      "equals": {
        "query": { "q": "robot" }
      }
    }
  ]
}
```

vs

```json
{
  "predicates": [
    {
      "equals": {
        "query": { "q": "robot" }
      },
      "caseSensitive": true
    }
  ]
}
```

---

## Using predicates on JSON values

### Using direct JSON predicates

> POST /items

```json
{ "name": "riderX", "price": 100, "quantity": 50 }
```

> direct-json-predicate.json

```json
{
  "predicates": [
    {
      "equals": {
        "body": {
          "name": "riderX"
        }
      }
    }
  ],
  "responses": [
    {
      "is": {
        "statusCode": 201,
        "headers": { "Location": "/items/123" }
      }
    }
  ]
}
```

### Selecting a JSON value with JSONPath

> POST /shipping

```json
{
  "items": [
    {
      "name": "TA Robot",
      "price": 109.99,
      "quantity": 50,
      "location": "Bangkok"
    },
    {
      "name": "AlphaBot2",
      "price": 71.0,
      "quantity": 73,
      "location": "Covid-19 Zone"
    }
  ]
}
```

> select-a-json-value-with-jsonpath-predicate.json

```json
{
  "predicates": [
    { "equals": { "method": "POST" } },
    { "equals": { "path": "/shipping" } },
    {
      "jsonpath": {
        "selector": "$.items[(@.length-1)].location"
      },
      "equals": { "body": "Covid-19 Zone" }
    }
  ],
  "responses": [{ "is": { "statusCode": 400 } }]
}
```

> ref: [JSONPath syntax](https://goessner.net/articles/JsonPath/)

## Selecting XML values

> POST /shipping

```xml
<items>
    <item name="TA Robot">
        <price>109.99</price>
        <location>Bangkok</location>
    </item>
    <item name="AlphaBot2">
        <price>71.50</price>
        <location>Covid-19 Zone</location>
    </item>
</items>
```

> select-a-xml-value-with-xpath-predicate.json

```json
{
  "predicates": [
    { "equals": { "method": "POST" } },
    { "equals": { "path": "/shipping" } },
    {
      "xpath": {
        "selector": "//item[@name='AlphaBot2']/location"
      },
      "equals": { "body": "Covid-19 Zone" }
    }
  ],
  "responses": [{ "is": { "statusCode": 400 } }]
}
```
