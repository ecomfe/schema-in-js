/**
 * schema in js
 *
 * @file boolean schema class.
 * @author hiby(yanghuabei@outlook.com)
 */

import {Schema} from './schema';
import {purify} from '../util';
import {TITLE, DESCRIPTION} from '../const';

/**
 * boolean schema class.
 *
 * @class Bool
 * @extends Schema
 */
export class Bool extends Schema {

    /**
     * type
     *
     * @override
     */
    get type() {
        return 'boolean';
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
            description: this[DESCRIPTION]
        };
        return purify(schema);
    }
}
