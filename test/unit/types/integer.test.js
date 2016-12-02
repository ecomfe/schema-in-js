/**
 * schema in js
 *
 * @file Number class test cases
 * @author hiby(yanghuabei@outlook.com)
 */

import {assert} from 'chai';

import {Int} from '../../../src/types/integer';
import {
    MINIMUM,
    MAXIMUM,
    EXCLUSIVE_MINIMUM,
    EXCLUSIVE_MAXIMUM,
    MULTILE_OF,
    REQUIRED,
    TITLE,
    DESCRIPTION
} from '../../../src/const';

describe('types.integer', function () {
    it('Int should be a function', function () {
        assert.typeOf(Int, 'function');
    });

    let schema = null;

    beforeEach(function () {
        schema = new Int();
    });

    afterEach(function () {
        schema = null;
    });

    it('Property type should be "integer"', function () {
        assert.equal(schema.type, 'integer');
    });

    it('Default required should be true', function () {
        assert.equal(schema[REQUIRED], true);
    });

    it('Method should work well', function () {
        let cases = [
            ['maximum', 90, MAXIMUM],
            ['minimum', 3, MINIMUM],
            ['exclusiveMaximum', true, EXCLUSIVE_MAXIMUM],
            ['exclusiveMinimum', true, EXCLUSIVE_MINIMUM],
            ['multipleOf', 3, MULTILE_OF],
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

    describe('Int.range', function () {
        it('Range method should work well with four params', function () {
            schema.range(6, true, 3, true);
            assert.equal(schema[MAXIMUM], 6);
            assert.equal(schema[EXCLUSIVE_MAXIMUM], true);
            assert.equal(schema[MINIMUM], 3);
            assert.equal(schema[EXCLUSIVE_MINIMUM], true);
        });


        it('Range method should work well with three params', function () {
            schema.range(6, true, 3);
            assert.equal(schema[MAXIMUM], 6);
            assert.equal(schema[EXCLUSIVE_MAXIMUM], true);
            assert.equal(schema[MINIMUM], 3);
            assert.equal(schema[EXCLUSIVE_MINIMUM], undefined);
        });

        it('Range method should work well with two params', function () {
            schema.range(6, true);
            assert.equal(schema[MAXIMUM], 6);
            assert.equal(schema[EXCLUSIVE_MAXIMUM], true);
            assert.equal(schema[MINIMUM], undefined);
            assert.equal(schema[EXCLUSIVE_MINIMUM], undefined);

            schema = new Int();
            schema.range(6, 3);
            assert.equal(schema[MAXIMUM], 6);
            assert.equal(schema[EXCLUSIVE_MAXIMUM], undefined);
            assert.equal(schema[MINIMUM], 3);
            assert.equal(schema[EXCLUSIVE_MINIMUM], undefined);

            schema = new Int();
            schema.range(null, 3);
            assert.equal(schema[MAXIMUM], undefined);
            assert.equal(schema[EXCLUSIVE_MAXIMUM], undefined);
            assert.equal(schema[MINIMUM], 3);
            assert.equal(schema[EXCLUSIVE_MINIMUM], undefined);
        });

        it('Range method should work well with 1 param', function () {
            schema.range(6);
            assert.equal(schema[MAXIMUM], 6);
            assert.equal(schema[EXCLUSIVE_MAXIMUM], undefined);
            assert.equal(schema[MINIMUM], undefined);
            assert.equal(schema[EXCLUSIVE_MINIMUM], undefined);
        });
    });

    describe('Num.toJSONSchema', function () {
        it('toJSONSchema method should return expected json schema', function () {
            schema
                .range(90, 30).multipleOf(3)
                .title('title').desc('desc');
            let transformedSchema = schema.toJSONSchema();
            assert.deepEqual(
                transformedSchema,
                {
                    type: 'integer',
                    maximum: 90,
                    minimum: 30,
                    multipleOf: 3,
                    title: 'title',
                    description: 'desc'
                }
            );
        });

        it('toJSONSchema method returned schema should be purified', function () {
            let transformedSchema = schema.toJSONSchema();
            assert.deepEqual(
                transformedSchema,
                {
                    type: 'integer'
                }
            );
            assert.notDeepEqual(
                transformedSchema,
                {
                    type: 'integer',
                    title: undefined,
                    description: undefined,
                    maximum: undefined,
                    minimum: undefined,
                    exclusiveMaximum: undefined,
                    exclusiveMinimum: undefined,
                    multipleOf: undefined
                }
            );
        });
    });
});
