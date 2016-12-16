# schema-in-js

![Build Status](https://img.shields.io/travis/yanghuabei/schema-in-js.svg)
![Coverage](https://img.shields.io/coveralls/yanghuabei/schema-in-js.svg)
![Downloads](https://img.shields.io/npm/dm/schema-in-js.svg)
![Downloads](https://img.shields.io/npm/dt/schema-in-js.svg)
![npm version](https://img.shields.io/npm/v/schema-in-js.svg)
![dependencies](https://img.shields.io/david/yanghuabei/schema-in-js.svg)
![dev dependencies](https://img.shields.io/david/dev/yanghuabei/schema-in-js.svg)
![License](https://img.shields.io/npm/l/schema-in-js.svg)

Write json schema fast in js.

## In Developing! Every version may have breaking change!

## Why?
+ JSON is tedious and error prone.
+ JSON schema is tedious and error prone.

## Install

```shell
npm install schema-in-js
```

## Usage

Suppose we want to write json schema for a entity called user which has username, password, age, gender, province and city. City can be provided only if province exsits.

If wrote in json schema, the result is:

```json
{
    "type": "object",
    "description": "User",
    "properties": {
        "username": {
            "type": "string",
            "maxLength": 20,
            "minLength": 4
        },
        "password": {
            "type": "string",
            "pattern": "^(?:\\d+|[a-zA-Z]+|[!@#$%^&*]+)$"
        },
        "age": {
            "type": "integer",
            "max": 100,
            "min": 16
        },
        "gender": {
            "enum": ["male", "female"]
        },
        "province": {
            "type": "string",
            "maxLength": 10
        },
        "city": {
            "type": "string",
            "maxLength": 10
        }
    },
    "required": ["username", "password"],
    "dependencies": {
        "city": ["province"]
    }
}
```

With schema in js, the result is:

```javascript
import {default as sj, description, dependencies} from 'schema-in-js';
export const userSchema = {
    [description]: 'User',
    username: sj.str.length(10, 4),
    password: sj.str.pattern('^(?:\\d+|[a-zA-Z]+|[!@#$%^&*]+)$'),
    age: sj.int.range(100, 16).mayBe(),
    gender: sj.enum('male', 'female').mayBe(),
    province: sj.str.length(10).mayBe(),
    city: sj.str.length(10).mayBe(),
    [dependencies]: {city: ['province']}
};
```

We can tranform the schema wrote by schema-in-js to rightful json schema through sj.tranformToJSONSchema.

## Core apis
### Module entry
#### default
Instance of SchemaInJS.

##### SchemaInJS apis
+ tranformToJSONSchema: Function


#### object relevant keywords
+ id
+ title
+ description
+ dependencies
+ additionalProperties
+ patternProperties
+ maxProperties
+ minProperties

#### Builtin types
+ Str
+ Obj
+ Num
+ Int
+ Arr
+ Bool

#### Combining keywords
In developing.


## TODO
### JSON Schema keywords to support.
+ allOf
+ anyOf
+ oneOf
+ not

### Features
+ Type customization.
+ Extensional keyword.

## License
MIT
