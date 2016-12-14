/**
 * schema in js
 *
 * @file object schema class definition
 * @author hiby(yanghuabei@outlook.com)
 */

import _ from 'lodash';
import {Schema} from './schema';
import {purify, assignIfNotEmptyOrNull} from '../util';
import {
    ADDITIONAL_PROPERTIES,
    DEPENDENCIES,
    DESCRIPTION,
    MAX_PROPERTIES,
    MIN_PROPERTIES,
    PATTERN_PROPERTIES,
    PROPERTIES,
    REQUIRED,
    TITLE
} from '../const';

/**
 * object schema class
 *
 * @class Obj
 * @extends Schema
 */
export class Obj extends Schema {

    /**
     * @override
     */
    get type() {
        return 'object';
    }

    /**
     * Set properties
     *
     * @public
     * @param {Object} props property collection
     * @return {Obj}
     */
    properties(props = {}) {
        this[PROPERTIES] = props;
        return this;
    }

    /**
     * Alias for properties
     *
     * @public
     * @param {Object} props property collection
     * @return {Obj}
     */
    props(props = {}) {
        return this.properties(props);
    }

    /**
     * Set pattern properties
     *
     * @public
     * @param {string} regex Regex in string
     * @return {Obj}
     */
    patternProperties(regex) {
        this[PATTERN_PROPERTIES] = regex;
        return this;
    }

    /**
     * Alias for patternProperties
     *
     * @public
     * @param {string} regex Regex in string
     * @return {Obj}
     */
    patternProps(regex) {
        return this.patternProperties(regex);
    }

    /**
     * Set additional properties
     *
     * @public
     * @param {boolean | Object} additionalProperties Additional properties
     * @return {Obj}
     */
    additionalProperties(additionalProperties) {
        this[ADDITIONAL_PROPERTIES] = additionalProperties;
        return this;
    }

    /**
     * Alias for additionalProperties
     *
     * @public
     * @param {boolean | Object} additionalProperties Additional properties
     * @return {Obj}
     */
    extraProps(additionalProperties) {
        return this.additionalProperties(additionalProperties);
    }

    /**
     * Set dependencies
     *
     * @public
     * @param {Object} deps Dependencies
     * @return {Obj}
     */
    dependencies(deps) {
        this[DEPENDENCIES] = deps;
        return this;
    }

    /**
     * Alias for dependencies
     *
     * @public
     * @param {Object} deps Dependencies
     * @return {Obj}
     */
    deps(deps) {
        return this.dependencies(deps);
    }

    /**
     * Set max properties
     *
     * @public
     * @param {number} max Max properties
     * @return {Obj}
     */
    maxProperties(max) {
        this[MAX_PROPERTIES] = max;
        return this;
    }

    /**
     * Set min properties
     *
     * @public
     * @param {number} min Min properties
     * @return {Obj}
     */
    minProperties(min) {
        this[MIN_PROPERTIES] = min;
        return this;
    }

    /**
     * Set size of properties
     *
     * @public
     * @param {number} max Max properties
     * @param {number} [min] Min properties
     * @return {Obj}
     */
    size(max, min) {
        if (max != null) {
            this.maxProperties(max);
        }

        if (min != null) {
            this.minProperties(min);
        }

        return this;
    }

    /**
     * @override
     */
    toJSONSchema() {
        let schema = {
            type: this.type,
            title: this[TITLE],
            description: this[DESCRIPTION],
            maxProperties: this[MAX_PROPERTIES],
            minProperties: this[MIN_PROPERTIES],
            patternProperties: this[PATTERN_PROPERTIES]
        };

        // 生成properties和required定义
        let {properties, required} = this.buildPropertiesAndRequired(this[PROPERTIES]);
        schema = assignIfNotEmptyOrNull(schema, 'properties', properties);
        schema = assignIfNotEmptyOrNull(schema, 'required', required);

        let additionalProperties = this[ADDITIONAL_PROPERTIES];
        if (additionalProperties && additionalProperties.toJSONSchema) {
            additionalProperties = additionalProperties.toJSONSchema();
        }
        schema.additionalProperties = additionalProperties;

        // Generate json schema object dependencies definition.
        let dependencies = this.buildDependencies(this[DEPENDENCIES]);
        schema = assignIfNotEmptyOrNull(schema, 'dependencies', dependencies);

        return purify(schema, undefined, true);
    }

    /**
     * Exract json schema object properties and required definition from schema-in-js properties declaration.
     *
     * @private
     * @param {Object} properties Schema-in-js properties declaration.
     * @return {Object}
     * @property {Object} properties Json schema object properties definition.
     * @property {Array<string>} required Json schema object required definition.
     */
    buildPropertiesAndRequired(properties = {}) {
        return Object.entries(properties).reduce(
            (prev, [key, value]) => {
                if (value[REQUIRED]) {
                    prev.required.push(key);
                }
                prev.properties[key] = value.toJSONSchema();
                return prev;
            },
            {properties: {}, required: []}
        );
    }

    /**
     * Exract json schema object dependencies definition from schema-in-js dependencies declaration.
     *
     * @private
     * @param {Object} dependencies Schema-in-js dependencies declaration.
     * @return {Object} Json schema object properties definition.
     * @todo extact schema dependencies build logic.
     */
    buildDependencies(dependencies = {}) {
        return Object.entries(dependencies).reduce(
            (prev, [key, value]) => {
                // property dependencies
                if (_.isArray(value)) {
                    prev[key] = value;
                }
                // schema dependencies
                else if (_.isObject(value)) {
                    prev[key] = this.buildPropertiesAndRequired(value);
                }
                return prev;
            },
            {}
        );
    }
}
