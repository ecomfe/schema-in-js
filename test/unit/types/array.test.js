/**
 * schema in js
 *
 * @file Array class test cases
 * @author hiby(yanghuabei@outlook.com)
 */

import {assert} from 'chai';

import {Arr} from '../../../src/types/array';
import {Str} from '../../../src/types/string';
import {Num} from '../../../src/types/number';
import {
    ITEMS,
    MAX_ITEMS,
    MIN_ITEMS,
    ADDITIONAL_ITEMS,
    UNIQUE_ITEMS,
    REQUIRED,
    TITLE,
    DESCRIPTION
} from '../../../src/const';

describe('types.array', function () {
    it('Arr should be a function', function () {
        assert.typeOf(Arr, 'function');
    });

    let schema = null;

    beforeEach(function () {
        schema = new Arr();
    });

    afterEach(function () {
        schema = null;
    });

    it('Property type should be "array"', function () {
        assert.equal(schema.type, 'array');
    });

    it('Default required should be true', function () {
        assert.equal(schema[REQUIRED], true);
    });

    it('Method should work well', function () {
        let strSchema = new Str();
        let cases = [
            ['items', strSchema, ITEMS],
            ['maxItems', 10, MAX_ITEMS],
            ['minItems', 2, MIN_ITEMS],
            ['uniqueItems', true, UNIQUE_ITEMS],
            ['additionalItems', false, ADDITIONAL_ITEMS],
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

    describe('Arr.size', function () {
        it('Range method should work well with two params', function () {
            schema.size(6, 3);
            assert.equal(schema[MAX_ITEMS], 6);
            assert.equal(schema[MIN_ITEMS], 3);

            schema = new Arr();
            schema.size(null, 3);
            assert.equal(schema[MAX_ITEMS], undefined);
            assert.equal(schema[MIN_ITEMS], 3);
        });

        it('Range method should work well with one params', function () {
            schema.size(6);
            assert.equal(schema[MAX_ITEMS], 6);
        });
    });

    describe('Arr.buildItems', function () {
        it('buildItems should work well schema param', function () {
            let items = schema.buildItems(new Str().maxLength(10));
            assert.deepEqual(
                items,
                {
                    type: 'string',
                    maxLength: 10
                }
            );
        });

        it('buildItems should work well schema array param', function () {
            let items = schema.buildItems([new Str().maxLength(10), new Num().range(10)]);
            assert.deepEqual(
                items,
                [
                    {
                        type: 'string',
                        maxLength: 10
                    },
                    {
                        type: 'number',
                        maximum: 10
                    }
                ]
            );
        });
    });

    describe('Arr.buildAdditionalItems', function () {
        it('buildAdditionalItems should work well schema param', function () {
            let additionalItems = schema.buildAdditionalItems(new Str().maxLength(10));
            assert.deepEqual(
                additionalItems,
                {
                    type: 'string',
                    maxLength: 10
                }
            );
        });

        it('buildAdditionalItems should work well schema boolean param', function () {
            let additionalItems = schema.buildAdditionalItems(false);
            assert.equal(additionalItems, false);
        });
    });

    describe('Arr.toJSONSchema', function () {
        it('toJSONSchema method should return expected json schema', function () {
            schema
                .size(10, 3).uniq(true)
                .items(new Str().maxLength(10))
                .title('title').desc('desc');
            let transformedSchema = schema.toJSONSchema();
            assert.deepEqual(
                transformedSchema,
                {
                    type: 'array',
                    maxItems: 10,
                    minItems: 3,
                    uniqueItems: true,
                    items: {
                        type: 'string',
                        maxLength: 10
                    },
                    title: 'title',
                    description: 'desc'
                }
            );
        });

        it('toJSONSchema method should return expected json schema with right additionalItems', function () {
            schema
                .items([new Str().maxLength(10)])
                .extra(new Num().range(10));
            let transformedSchema = schema.toJSONSchema();
            assert.deepEqual(
                transformedSchema,
                {
                    type: 'array',
                    items: [
                        {
                            type: 'string',
                            maxLength: 10
                        }
                    ],
                    additionalItems: {
                        type: 'number',
                        maximum: 10
                    }
                }
            );
        });

        it('toJSONSchema method returned schema should be purified', function () {
            let transformedSchema = schema.toJSONSchema();
            assert.deepEqual(
                transformedSchema,
                {
                    type: 'array'
                }
            );
            assert.notDeepEqual(
                transformedSchema,
                {
                    type: 'array',
                    title: undefined,
                    description: undefined,
                    maxItems: undefined,
                    minItems: undefined,
                    uniqueItems: undefined
                }
            );
        });
    });
});
