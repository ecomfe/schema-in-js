/**
 * schema in js
 *
 * @file Number schema class.
 * @author hiby(yanghuabei@outlook.com)
 */
import _ from 'lodash';
import {Schema} from './schema';
import {purify} from '../util';
import {
    MINIMUM,
    MAXIMUM,
    EXCLUSIVE_MINIMUM,
    EXCLUSIVE_MAXIMUM,
    MULTILE_OF,
    TITLE,
    DESCRIPTION
} from '../const';

/**
 * Number schema class.
 *
 * @class Num
 * @extends Schema
 */
export class Num extends Schema {

    /**
     * Type
     *
     * @override
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
     * Transform to json schema.
     *
     * @override
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
