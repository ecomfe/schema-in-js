/**
 * schema in js
 *
 * @file Module entry.
 * @author hiby(yanghuabei@outlook.com)
 */

import {Types} from './types';

export {Str} from './types/string';
export {Num} from './types/number';
export {Int} from './types/integer';
export {Bool} from './types/boolean';
export {Arr} from './types/array';
export {Obj} from './types/object';

export {
    ID as id,
    TITLE as title,
    DESCRIPTION as description,
    PATTERN_PROPERTIES as patternProperties,
    ADDITIONAL_PROPERTIES as additionalProperties,
    DEPENDENCIES as dependencies,
    MAX_PROPERTIES as maxProperties,
    MIN_PROPERTIES as minProperties
} from './const';

export default new Types();