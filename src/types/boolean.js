/**
 * schema in js
 *
 * @file boolean schema class.
 * @author hiby(yanghuabei@outlook.com)
 */

import {Schema} from './schema';

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
}
