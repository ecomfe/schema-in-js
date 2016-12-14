/**
 * schema in js
 *
 * @file Base schema class.
 * @author hiby(yanghuabei@outlook.com)
 */

import {REQUIRED, TITLE, DESCRIPTION} from '../const';

/**
 * Base schema class.
 *
 * @class Str
 */
export class Schema {
    
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
        return '';
    }

    /**
     * Set required.
     *
     * @public
     * @param {boolean} required Whether required.
     * @return {Schema}
     */
    required(required = true) {
        this[REQUIRED] = required;
        return this;
    }

    /**
     * Set to not required.
     *
     * @public
     * @return {Schema}
     */
    mayBe() {
        return this.required(false);
    }

    /**
     * Set title.
     *
     * @public
     * @param {string} title Property title.
     * @return {Schema}
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
     * @return {Schema}
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
     * @return {Schema}
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
        return {};
    }
}
