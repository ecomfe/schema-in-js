/**
 * schema in js
 *
 * @file Array schema class.
 * @author hiby(yanghuabei@outlook.com)
 */

import _ from 'lodash';
import {purify, assignIfNotEmptyOrNull, isSchema} from '../util';
import {
    ITEMS,
    MAX_ITEMS,
    MIN_ITEMS,
    ADDITIONAL_ITEMS,
    UNIQUE_ITEMS,
    REQUIRED,
    TITLE,
    DESCRIPTION
} from '../const';

/**
 * Array schema class.
 *
 * @class Arr
 */
export class Arr {

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
        return 'array';
    }

    /**
     * Set items.
     *
     * @public
     * @param {Object | Array<Object>} items Schema of item in array.
     * @return {Arr}
     */
    items(items) {
        this[ITEMS] = items;
        return this;
    }

    /**
     * Set maxItems.
     *
     * @public
     * @param {number} max Maximum items.
     * @return {Arr}
     */
    maxItems(max) {
        this[MAX_ITEMS] = max;
        return this;
    }

    /**
     * Set minItems.
     *
     * @public
     * @param {number} min minItems items.
     * @return {Arr}
     */
    minItems(min) {
        this[MIN_ITEMS] = min;
        return this;
    }

    /**
     * Set additionalItems.
     *
     * @public
     * @param {boolean | Object} additionalItems Additional items.
     * @return {Arr}
     */
    additionalItems(additionalItems) {
        this[ADDITIONAL_ITEMS] = additionalItems;
        return this;
    }

    /**
     * Alias for additionalItems setter.
     *
     * @public
     * @param {boolean | Object} additionalItems Additional items.
     * @return {Arr}
     */
    extra(additionalItems) {
        return this.additionalItems(additionalItems);
    }

    /**
     * Set uniqueItems.
     *
     * @public
     * @return {Arr}
     */
    uniqueItems() {
        this[UNIQUE_ITEMS] = true;
        return this;
    }

    /**
     * Alias for uniqueItems setter.
     *
     * @public
     * @return {Arr}
     */
    uniq() {
        return this.uniqueItems();
    }

    /**
     * Set items count.
     *
     * @public
     * @param {number} max Max items.
     * @param {number} [min] Min items.
     * @return {Arr}
     */
    size(max, min) {
        if (max != null) {
            this.maxItems(max);
        }

        if (min != null) {
            this.minItems(min);
        }

        return this;
    }

    /**
     * Set required.
     *
     * @public
     * @param {boolean} required Whether required.
     * @return {Arr}
     */
    required(required = true) {
        this[REQUIRED] = required;
        return this;
    }

    /**
     * Set to not required.
     *
     * @public
     * @return {Arr}
     */
    mayBe() {
        return this.required(false);
    }

    /**
     * Set title.
     *
     * @public
     * @param {string} title Property title.
     * @return {Arr}
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
     * @return {Arr}
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
     * @return {Arr}
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
            maxItems: this[MAX_ITEMS],
            minItems: this[MIN_ITEMS],
            uniqueItems: this[UNIQUE_ITEMS]
        };

        let items = this.buildItems(this[ITEMS]);
        let additionalItems = this.buildAdditionalItems(this[ADDITIONAL_ITEMS]);
        schema = assignIfNotEmptyOrNull(schema, 'items', items);
        schema = assignIfNotEmptyOrNull(schema, 'additionalItems', additionalItems);

        return purify(schema, undefined, true);
    }

    /**
     * Build schema-in-js items to json schema.
     *
     * @public
     * @param {Schema | Array<Schema>} items Schema-in-js items definition.
     * @return {Object | Array<Object>}
     */
    buildItems(items) {
        if (_.isArray(items)) {
            return items.map(item => item.toJSONSchema());
        }

        if (isSchema(items)) {
            return items.toJSONSchema();
        }
    }

    /**
     * Build schema-in-js additionalItems to json schema.
     *
     * @public
     * @param {Schema | Boolean} additionalItems Schema-in-js additionalItems definition.
     * @return {Object | Boolean}
     */
    buildAdditionalItems(additionalItems) {
        if (isSchema(additionalItems)) {
            return additionalItems.toJSONSchema();
        }

        return additionalItems;
    }
}
