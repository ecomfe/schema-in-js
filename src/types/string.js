/**
 * schema in js
 *
 * @file String schema class.
 * @author hiby(yanghuabei@outlook.com)
 */

import {Schema} from './schema';
import {purify} from '../util';
import {PATTERN, MAX_LENGTH, MIN_LENGTH} from '../const';

/**
 * String schema class.
 *
 * @class Str
 * @extends Schema
 */
export class Str extends Schema {

    /**
     * Type
     *
     * @readonly
     * @type {string}
     * @override
     */
    get type() {
        return 'string';
    }

    /**
     * Set pattern.
     *
     * @public
     * @return {Str}
     */
    pattern(regex) {
        this[PATTERN] = regex;
        return this;
    }

    /**
     * Set maxLength.
     *
     * @public
     * @param {number} number Max length of value.
     * @return {Str}
     */
    maxLength(number) {
        this[MAX_LENGTH] = number;
        return this;
    }

    /**
     * Set minLength.
     *
     * @public
     * @param {number} number Min length of value.
     * @return {Str}
     */
    minLength(number) {
        this[MIN_LENGTH] = number;
        return this;
    }

    /**
     * Set length.
     *
     * @public
     * @param {number} maxLength Max length of value.
     * @param {number=} minLength Min length of value.
     * @return {Str}
     */
    size(maxLength, minLength) {
        if (maxLength != null) {
            this.maxLength(maxLength);
        }

        if (minLength != null) {
            this.minLength(minLength);
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
            ...super.toJSONSchema(),
            minLength: this[MIN_LENGTH],
            maxLength: this[MAX_LENGTH],
            pattern: this[PATTERN]
        };
        return purify(schema);
    }
}
