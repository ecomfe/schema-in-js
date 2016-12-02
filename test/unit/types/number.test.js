/**
 * schema in js
 *
 * @file Number class test cases
 * @author hiby(yanghuabei@outlook.com)
 */

import {assert} from 'chai';

import {Num} from '../../../src/types/number';
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

describe('types.number', function () {
    it('Num should be a function', function () {
        assert.typeOf(Num, 'function');
    });

    let schema = null;

    beforeEach(function () {
        schema = new Num();
    });

    afterEach(function () {
        schema = null;
    });

    it('Property type should be "number"', function () {
        assert.equal(schema.type, 'number');
    });

    it('Default required should be true', function () {
        assert.equal(schema[REQUIRED], true);
    });

    it('Method should work well', function () {
        let cases = [
            ['maximum', 90.0, MAXIMUM],
            ['minimum', 3.0, MINIMUM],
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

    describe('Num.range', function () {
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

            schema = new Num();
            schema.range(6, 3);
            assert.equal(schema[MAXIMUM], 6);
            assert.equal(schema[EXCLUSIVE_MAXIMUM], undefined);
            assert.equal(schema[MINIMUM], 3);
            assert.equal(schema[EXCLUSIVE_MINIMUM], undefined);

            schema = new Num();
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
                .range(90.0, 30.0).multipleOf(3)
                .title('title').desc('desc');
            let transformedSchema = schema.toJSONSchema();
            assert.deepEqual(
                transformedSchema,
                {
                    type: 'number',
                    maximum: 90.0,
                    minimum: 30.0,
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
                    type: 'number'
                }
            );
            assert.notDeepEqual(
                transformedSchema,
                {
                    type: 'number',
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
