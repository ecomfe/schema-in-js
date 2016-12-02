/**
 * schema in js
 *
 * @file String schema class.
 * @author hiby(yanghuabei@outlook.com)
 */

import {purify} from '../util';
import {PATTERN, MAX_LENGTH, MIN_LENGTH, REQUIRED, TITLE, DESCRIPTION} from '../const';

/**
 * String schema class.
 *
 * @class Str
 */
export class Str {

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
     * Set required.
     *
     * @public
     * @param {boolean} required Whether required.
     * @return {Str}
     */
    required(required = true) {
        this[REQUIRED] = required;
        return this;
    }

    /**
     * Set to not required.
     *
     * @public
     * @return {Str}
     */
    mayBe() {
        return this.required(false);
    }

    /**
     * Set title.
     *
     * @public
     * @param {string} title Property title.
     * @return {Str}
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
     * @return {Str}
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
     * @return {Str}
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
            minLength: this[MIN_LENGTH],
            maxLength: this[MAX_LENGTH],
            pattern: this[PATTERN]
        };
        return purify(schema);
    }
}
