/**
 * schema in js
 *
 * @file Base schema class.
 * @author hiby(yanghuabei@outlook.com)
 */

import {ID, REQUIRED, TITLE, DESCRIPTION, ENUM, DEFAULT} from '../const';
import {purify} from '../util';

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
        return 'null';
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
     * Set id.
     *
     * @public
     * @return {Schema}
     */
    id(id) {
        this[ID] = id;
        return this;
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
     * Set enum.
     *
     * @public
     * @param {Array<Any>} values Avaialable values.
     * @return {Schema}
     */
    enum(values) {
        this[ENUM] = values;
        return this;
    }

    /**
     * Set default.
     *
     * @public
     * @param {Any} defaultValue Default value.
     * @return {Schema}
     */
    default(defaultValue) {
        this[DEFAULT] = defaultValue;
        return this;
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
            id: this[ID],
            title: this[TITLE],
            description: this[DESCRIPTION],
            default: this[DEFAULT],
            enum: this[ENUM]
        };

        return purify(schema);
    }
}
