/**
 * schema in js
 *
 * @file 字符串定义测试
 * @author hiby(yanghuabei@outlook.com)
 */

import {assert} from 'chai';

import {Obj} from '../../../src/types/object';
import {Str} from '../../../src/types/string';
import {
    ADDITIONAL_PROPERTIES,
    DEPENDENCIES,
    DESCRIPTION,
    MAX_PROPERTIES,
    MIN_PROPERTIES,
    PATTERN_PROPERTIES,
    PROPERTIES,
    REQUIRED,
    TITLE
} from '../../../src/const';

describe('type.object', function () {
    it('Obj should be a function', function () {
        assert.typeOf(Obj, 'function');
    });

    let schema = null;

    beforeEach(function () {
        schema = new Obj();
    });

    afterEach(function () {
        schema = null;
    });

    it('Property type should be "object"', function () {
        assert.equal(schema.type, 'object');
    });

    it('Default required should be true', function () {
        assert.equal(schema[REQUIRED], true);
    });

    it('Method should work well', function () {
        let cases = [
            ['minProperties', 3, MIN_PROPERTIES],
            ['maxProperties', 5, MAX_PROPERTIES],
            ['properties', {}, PROPERTIES],
            ['maxProperties', 5, MAX_PROPERTIES],
            ['patternProperties', 'z.*', PATTERN_PROPERTIES],
            ['dependencies', {key1: ['key2']}, DEPENDENCIES],
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

    describe('Obj.size', function () {
        it('Size method should work well with two params', function () {
            schema.size(6, 3);
            assert.equal(schema[MIN_PROPERTIES], 3);
            assert.equal(schema[MAX_PROPERTIES], 6);
        });

        it('Size method should work well with first param null', function () {
            schema.size(null, 3);
            assert.equal(schema[MIN_PROPERTIES], 3);
            assert.equal(schema[MAX_PROPERTIES], null);
        });

        it('Size method should work well with 1 params', function () {
            schema.size(6);
            assert.equal(schema[MAX_PROPERTIES], 6);
        });
    });

    describe('Obj.buildPropertiesAndRequired', function () {
        it('buildPropertiesAndRequired method should work well.', function () {
            let results = schema.buildPropertiesAndRequired({
                name: new Str().maxLength(10),
                gender: new Str().minLength(1).mayBe()
            });
            assert.deepEqual(
                results,
                {
                    properties: {
                        name: {
                            type: 'string',
                            maxLength: 10
                        },
                        gender: {
                            type: 'string',
                            minLength: 1
                        }
                    },
                    required: ['name']
                }
            );
        });
    });

    describe('Obj.buildDependencies', function () {
        it('buildDependencies should work well with property dependencies.', function () {
            let deps = schema.buildDependencies({name: ['gender']});
            assert.deepEqual(deps, {name: ['gender']});
        });

        it('buildDependencies should work well with schema dependencies.', function () {
            let deps = schema.buildDependencies({name: {gender: new Str().maxLength(10)}});
            assert.deepEqual(deps, {
                name: {
                    properties: {
                        gender: {
                            type: 'string',
                            maxLength: 10
                        }
                    },
                    required: ['gender']
                }
            });
        });

        it('buildDependencies should work well with schema and properties dependencies.', function () {
            let deps = schema.buildDependencies({name: {gender: new Str().maxLength(10)}, year: ['month']});
            assert.deepEqual(deps, {
                name: {
                    properties: {
                        gender: {
                            type: 'string',
                            maxLength: 10
                        }
                    },
                    required: ['gender']
                },
                year: ['month']
            });
        });
    });

    describe('Obj.toJSONSchema', function () {
        it('toJSONSchema method should return expected json schema', function () {
            schema
                .size(10, 3).patternProps('^r.*s$')
                .title('title').desc('desc')
                .props({name: new Str().maxLength(10), gender: new Str().maxLength(10).mayBe()})
                .deps({gender: ['name']}).extraProps(true);
            let transformedSchema = schema.toJSONSchema();
            assert.deepEqual(
                transformedSchema,
                {
                    type: 'object',
                    maxProperties: 10,
                    minProperties: 3,
                    patternProperties: '^r.*s$',
                    title: 'title',
                    description: 'desc',
                    properties: {
                        name: {
                            type: 'string',
                            maxLength: 10
                        },
                        gender: {
                            type: 'string',
                            maxLength: 10
                        }
                    },
                    required: ['name'],
                    dependencies: {
                        gender: ['name']
                    },
                    additionalProperties: true
                }
            );
        });

        it('toJSONSchema method returned schema should be purified', function () {
            let transformedSchema = schema.toJSONSchema();
            assert.deepEqual(
                transformedSchema,
                {
                    type: 'object'
                }
            );
            assert.notDeepEqual(
                transformedSchema,
                {
                    type: 'object',
                    title: undefined,
                    description: undefined
                }
            );
        });
    });
});
