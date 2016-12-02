/**
 * schema in js
 *
 * @file Integer schema class.
 * @author hiby(yanghuabei@outlook.com)
 */
import {Num} from './number';

/**
 * Integer schema class.
 *
 * @class Int
 */
export class Int extends Num {

    /**
     * @override
     */
    get type() {
        return 'integer';
    }

    /**
     * @override
     */
    toJSONSchema() {
        let schema = super.toJSONSchema();
        schema.type = this.type;

        return schema;
    }
}
