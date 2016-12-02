/**
 * schema in js
 *
 * @file 字符串定义测试
 * @author hiby(yanghuabei@outlook.com)
 */

import {assert} from 'chai';

import {Str} from '../../../src/types/string';
import {PATTERN, MAX_LENGTH, MIN_LENGTH, REQUIRED, TITLE, DESCRIPTION} from '../../../src/const';

describe('type.string', function () {
    it('Str should be a function', function () {
        assert.typeOf(Str, 'function');
    });

    let stringSchema = new Str();

    it('Property type should be "string"', function () {
        assert.equal(stringSchema.type, 'string');
    });

    it('Default required should be true', function () {
        assert.equal(stringSchema[REQUIRED], true);
    });

    beforeEach(function () {
        stringSchema = new Str();
    });

    afterEach(function () {
        stringSchema = null;
    });

    it('Method should work well', function () {
        let cases = [
            ['minLength', 3, MIN_LENGTH],
            ['maxLength', 5, MAX_LENGTH],
            ['pattern', 'z.*', PATTERN],
            ['title', 'title', TITLE],
            ['description', 'description', DESCRIPTION],
            ['mayBe', false, REQUIRED],
            ['required', false, REQUIRED]
        ];

        cases.forEach(([method, value, property]) => {
            stringSchema[method](value);
            assert.equal(stringSchema[property], value);
        });
    });

    describe('Str.size', function () {
        let stringSchema = new Str();

        beforeEach(function () {
            stringSchema = new Str();
        });

        afterEach(function () {
            stringSchema = null;
        });

        it('Size method should work well with two params', function () {
            stringSchema.size(6, 3);
            assert.equal(stringSchema[MIN_LENGTH], 3);
            assert.equal(stringSchema[MAX_LENGTH], 6);
        });

        it('Size method should work well with first param null', function () {
            stringSchema.size(null, 3);
            assert.equal(stringSchema[MIN_LENGTH], 3);
            assert.equal(stringSchema[MAX_LENGTH], null);
        });

        it('Size method should work well with 1 params', function () {
            stringSchema.size(6);
            assert.equal(stringSchema[MAX_LENGTH], 6);
        });
    });

    describe('Str.toJSONSchema', function () {
        let stringSchema = new Str();

        beforeEach(function () {
            stringSchema = new Str();
        });

        afterEach(function () {
            stringSchema = null;
        });

        it('toJSONSchema method should return expected json schema', function () {
            stringSchema.size(10, 3).pattern('^r.*s$').title('title').desc('desc').mayBe();
            let schema = stringSchema.toJSONSchema();
            assert.deepEqual(
                schema,
                {
                    type: 'string',
                    maxLength: 10,
                    minLength: 3,
                    pattern: '^r.*s$',
                    title: 'title',
                    description: 'desc'
                }
            );
        });

        it('toJSONSchema method returned schema should be purified', function () {
            let schema = stringSchema.toJSONSchema();
            assert.deepEqual(
                schema,
                {
                    type: 'string'
                }
            );
            assert.notDeepEqual(
                schema,
                {
                    type: 'string',
                    maxLength: undefined,
                    title: undefined,
                    pattern: undefined,
                    description: undefined
                }
            );
        });
    });
});
