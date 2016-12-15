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

## In Developing! Every version has breaking change!

## Getting Started

Install it via npm:

```shell
npm install schema-in-js
```
## Usage


And include in your project:

```javascript
import sj from 'schema-in-js';

let schema = {
    name: sj.str.length(10, 5)
};

let jsonSchema = sj.transformToJSONSchema(schema);
console.log(jsonSchema);

// output
{
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 10,
            minLength: 5
        }
    },
    required: ['name']
}
```

## License

MIT
