/**
 * schema in js
 *
 * @file boolean schema class.
 * @author hiby(yanghuabei@outlook.com)
 */

import {purify} from '../util';
import {REQUIRED, TITLE, DESCRIPTION} from '../const';

/**
 * boolean schema class.
 *
 * @class Bool
 */
export class Bool {

    /**
     * @constructor
     */
    constructor() {
        this[REQUIRED] = true;
    }

    /**
     * type
     *
     * @readonly
     * @type {string}
     */
    get type() {
        return 'boolean';
    }

    /**
     * Set required.
     *
     * @public
     * @param {boolean} [required=true] Whether required.
     * @return {Bool}
     */
    required(required = true) {
        this[REQUIRED] = required;
        return this;
    }

    /**
     * Set to not required.
     *
     * @public
     * @return {Bool}
     */
    mayBe() {
        return this.required(false);
    }

    /**
     * Set title.
     *
     * @public
     * @param {string} title Property title.
     * @return {Bool}
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
     * @return {Bool}
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
     * @return {Bool}
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
            description: this[DESCRIPTION]
        };
        return purify(schema);
    }
}
