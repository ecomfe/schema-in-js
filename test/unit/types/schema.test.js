/**
 * schema in js
 *
 * @file schema unit test
 * @author hiby(yanghuabei@outlook.com)
 */

import {assert} from 'chai';
import {Schema} from '../../../src/types/schema';
import {REQUIRED, TITLE, DESCRIPTION} from '../../../src/const';

describe('type.string', function () {
    it('Str should be a function', function () {
        assert.typeOf(Schema, 'function');
    });

    let schema = new Schema();

    it('Property type should be ""', function () {
        assert.equal(schema.type, '');
    });

    it('Default required should be true', function () {
        assert.equal(schema[REQUIRED], true);
    });

    beforeEach(function () {
        schema = new Schema();
    });

    afterEach(function () {
        schema = null;
    });

    it('Method should work well', function () {
        let cases = [
            ['title', 'title', TITLE],
            ['description', 'description', DESCRIPTION],
            ['mayBe', false, REQUIRED],
            ['required', false, REQUIRED]
        ];

        cases.forEach(([method, value, property]) => {
            schema[method](value);
            assert.equal(schema[property], value);
        });
    });

    describe('Str.toJSONSchema', function () {
        it('toJSONSchema method should return expected json schema', function () {
            schema.title('title').desc('desc').mayBe();
            schema = schema.toJSONSchema();
            assert.deepEqual(schema, {});
        });
    });
});
