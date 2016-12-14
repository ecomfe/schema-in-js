/**
 * schema in js
 *
 * @file Array schema class.
 * @author hiby(yanghuabei@outlook.com)
 */

import _ from 'lodash';
import {Schema} from './schema';
import {purify, assignIfNotEmptyOrNull} from '../util';
import {
    ITEMS,
    MAX_ITEMS,
    MIN_ITEMS,
    ADDITIONAL_ITEMS,
    UNIQUE_ITEMS,
} from '../const';

/**
 * Array schema class.
 *
 * @class Arr
 * @extends Schema
 */
export class Arr extends Schema {

    /**
     * @override
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
     * @override
     */
    toJSONSchema() {
        let schema = {
            ...super.toJSONSchema(),
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
     * @private
     * @param {Schema | Array<Schema>} items Schema-in-js items definition.
     * @return {Object | Array<Object>}
     */
    buildItems(items) {
        if (_.isArray(items)) {
            return items.map(item => item.toJSONSchema());
        }

        if (items instanceof Schema) {
            return items.toJSONSchema();
        }
    }

    /**
     * Build schema-in-js additionalItems to json schema.
     *
     * @private
     * @param {Schema | Boolean} additionalItems Schema-in-js additionalItems definition.
     * @return {Object | Boolean}
     */
    buildAdditionalItems(additionalItems) {
        if (additionalItems instanceof Schema) {
            return additionalItems.toJSONSchema();
        }

        return additionalItems;
    }
}
