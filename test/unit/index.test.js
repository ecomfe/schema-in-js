import {assert} from 'chai';
import * as entry from '../../src/index';
import {Types} from '../../src/types';
import {Str} from '../../src/types/string';
import {Num} from '../../src/types/number';
import {Int} from '../../src/types/integer';
import {Bool} from '../../src/types/boolean';
import {Arr} from '../../src/types/array';
import {Obj} from '../../src/types/object';
import {
    ADDITIONAL_PROPERTIES,
    DEPENDENCIES,
    MAX_PROPERTIES,
    MIN_PROPERTIES,
    PATTERN_PROPERTIES,
    ID,
    TITLE,
    DESCRIPTION
} from '../../src/const';

describe('index', function () {
    it('Should have right export.', () => {
        assert.instanceOf(entry.default, Types);
        assert.equal(entry.Str, Str);
        assert.equal(entry.Num, Num);
        assert.equal(entry.Bool, Bool);
        assert.equal(entry.Obj, Obj);
        assert.equal(entry.Int, Int);
        assert.equal(entry.Arr, Arr);
        assert.equal(entry.additionalProperties, ADDITIONAL_PROPERTIES);
        assert.equal(entry.dependencies, DEPENDENCIES);
        assert.equal(entry.maxProperties, MAX_PROPERTIES);
        assert.equal(entry.minProperties, MIN_PROPERTIES);
        assert.equal(entry.patternProperties, PATTERN_PROPERTIES);
        assert.equal(entry.id, ID);
        assert.equal(entry.title, TITLE);
        assert.equal(entry.description, DESCRIPTION);
    });
});
