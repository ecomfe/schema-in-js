/**
 * schema in js
 *
 * @file JSON schema features collection class.
 * @author hiby(yanghuabei@outlook.com)
 */

import _ from 'lodash';
import {Schema} from './types/schema';
import {Str} from './types/string';
import {Num} from './types/number';
import {Int} from './types/integer';
import {Bool} from './types/boolean';
import {Arr} from './types/array';
import {Obj} from './types/object';
import {
    ADDITIONAL_PROPERTIES,
    DEPENDENCIES,
    MAX_PROPERTIES,
    MIN_PROPERTIES,
    PATTERN_PROPERTIES,
    ID,
    TITLE,
    DESCRIPTION
} from './const';

/**
 * JSON schema features collection class.
 * 
 * @class Types
 */
export class Types {

    /**
     * String schema getter.
     * 
     * @readonly
     * @type {Str}
     */
    get str() {
        return new Str();
    }

    /**
     * Number schema getter
     * 
     * @readonly
     * @type {Num}
     */
    get num() {
        return new Num();
    }

    /**
     * Integer schema getter
     * 
     * @readonly
     * @type {Int}
     */
    get int() {
        return new Int();
    }

    /**
     * Boolean schema getter
     * 
     * @readonly
     * @type {Bool}
     */
    get bool() {
        return new Bool();
    }

    /**
     * Array schema getter
     * 
     * @readonly
     * @type {Arr}
     */
    get arr() {
        return new Arr();
    }

    /**
     * Object schema getter
     * 
     * @readonly
     * @type {Obj}
     */
    get obj() {
        return new Obj();
    }

    /**
     * Transform schema in js to JSON schema.
     * 
     * @public
     * @param {Schema | Object} schemaInJS Schema in js.
     * @return {Object}
     */
    transformToJSONSchema(schemaInJS) {
        if (schemaInJS instanceof Schema) {
            return schemaInJS.toJSONSchema();
        }
        else if (_.isPlainObject(schemaInJS) && !_.isEmpty(schemaInJS)) {
            return this.fromPlainObjectToObjectSchema(schemaInJS).toJSONSchema();
        }
        throw new Error('Please input valid schema.');
    }

    /**
     * Transform plain object schema into Schema instance.
     * 
     * @private
     * @param {Object} plainObject Plain object schema.
     * @return {Obj}
     */
    fromPlainObjectToObjectSchema(plainObject) {
        let objectSchemaProperties = [
            [ADDITIONAL_PROPERTIES, 'additionalProperties'],
            [DEPENDENCIES, 'dependencies'],
            [MAX_PROPERTIES, 'maxProperties'],
            [MIN_PROPERTIES, 'minProperties'],
            [PATTERN_PROPERTIES, 'patternProperties'],
            [ID, 'id'],
            [TITLE, 'title'],
            [DESCRIPTION, 'description']
        ];
        let properties = _.omit(plainObject, objectSchemaProperties.map(item => item[0]));
        let schema = new Obj().props(properties);
        objectSchemaProperties.forEach(([property, setterName]) => schema[setterName](plainObject[property]));
        return schema;
    }
}