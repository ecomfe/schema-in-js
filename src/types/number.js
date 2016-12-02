/**
 * schema in js
 *
 * @file Number schema class.
 * @author hiby(yanghuabei@outlook.com)
 */
import _ from 'lodash';
import {purify, assignIfNotEmptyOrNull} from '../util';
import {
    MINIMUM,
    MAXIMUM,
    EXCLUSIVE_MINIMUM,
    EXCLUSIVE_MAXIMUM,
    MULTILE_OF,
    REQUIRED,
    TITLE,
    DESCRIPTION
} from '../const';

/**
 * Number schema class.
 *
 * @class Num
 */
export class Num {

    /**
     * @constructor
     */
    constructor() {
        this[REQUIRED] = true;
    }

    /**
     * Type
     *
     * @readonly
     * @type {string}
     */
    get type() {
        return 'number';
    }

    /**
     * Set minimum.
     *
     * @public
     * @param {number} min Min of value.
     * @return {Num}
     */
    minimum(min) {
        this[MINIMUM] = min;
        return this;
    }

    /**
     * Set exclusiveMinimum.
     *
     * @public
     * @param {boolean} exclusiveMinimum Whether exclude min.
     * @return {Num}
     */
    exclusiveMinimum(exclusiveMinimum) {
        this[EXCLUSIVE_MINIMUM] = exclusiveMinimum;
        return this;
    }

    /**
     * Set maximum.
     *
     * @public
     * @param {number} max Max of value.
     * @return {Num}
     */
    maximum(max) {
        this[MAXIMUM] = max;
        return this;
    }

    /**
     * Set exclusiveMaximum.
     *
     * @public
     * @param {boolean} exclusiveMaximum Whether exclude max.
     * @return {Num}
     */
    exclusiveMaximum(exclusiveMaximum) {
        this[EXCLUSIVE_MAXIMUM] = exclusiveMaximum;
        return this;
    }

    /**
     * Set multipleOf.
     *
     * @public
     * @param {number} multipleOf Multiple of value.
     * @return {Num}
     */
    multipleOf(multipleOf) {
        this[MULTILE_OF] = multipleOf;
        return this;
    }

    /**
     * Set num.
     *
     * @public
     * @param {number} max Max of value.
     * @param {boolean} [exclusiveMaximum] Whether exclude max.
     * @param {number} [min] Min of value.
     * @param {boolean} [exclusiveMinimum] Whether exclude min.
     * @return {Num}
     */
    range(max, exclusiveMaximum, min, exclusiveMinimum) {
        if (_.isNumber(exclusiveMaximum)) {
            min = exclusiveMaximum;
            exclusiveMaximum = undefined;
        }

        if (max != null) {
            this.maximum(max);
        }

        if (exclusiveMaximum != null) {
            this.exclusiveMaximum(exclusiveMaximum);
        }

        if (min != null) {
            this.minimum(min);
        }

        if (exclusiveMinimum != null) {
            this.exclusiveMinimum(exclusiveMinimum);
        }
        return this;
    }

    /**
     * Set required.
     *
     * @public
     * @param {boolean} required Whether required.
     * @return {Num}
     */
    required(required = true) {
        this[REQUIRED] = required;
        return this;
    }

    /**
     * Set to not required.
     *
     * @public
     * @return {Num}
     */
    mayBe() {
        return this.required(false);
    }

    /**
     * Set title.
     *
     * @public
     * @param {string} title Property title.
     * @return {Num}
     */
    title(title) {
        this[TITLE] = title;
        return this;
    }

    /**
     * Set description.
     *
     * @public
     * @param {string} description Description of property.
     * @return {Num}
     */
    description(description) {
        this[DESCRIPTION] = description;
        return this;
    }

    /**
     * Alias for description setter.
     *
     * @public
     * @param {string} description Description of property.
     * @return {Num}
     */
    desc(description) {
        return this.description(description);
    }

    /**
     * Transform to json schema.
     *
     * @public
     * @return {Object}
     */
    toJSONSchema() {
        let schema = {
            type: this.type,
            title: this[TITLE],
            description: this[DESCRIPTION],
            maximum: this[MAXIMUM],
            minimum: this[MINIMUM],
            exclusiveMaximum: this[EXCLUSIVE_MAXIMUM],
            exclusiveMinimum: this[EXCLUSIVE_MINIMUM],
            multipleOf: this[MULTILE_OF]
        };
        return purify(schema);
    }
}
