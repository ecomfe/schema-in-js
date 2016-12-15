/**
 * schema in js
 *
 * @file Array class test cases
 * @author hiby(yanghuabei@outlook.com)
 */

import {assert} from 'chai';

import {Bool} from '../../../src/types/boolean';

describe('types.Bool', function () {
    it('Bool should be a function', function () {
        assert.typeOf(Bool, 'function');
    });

    let schema = null;

    beforeEach(function () {
        schema = new Bool();
    });

    afterEach(function () {
        schema = null;
    });

    it('Property type should be "boolean"', function () {
        assert.equal(schema.type, 'boolean');
    });

    describe('Bool.prototype.toJSONSchema', function () {
        it('toJSONSchema method should return expected json schema', function () {
            schema
                .id('id').default(true)
                .title('title').desc('desc');
            let transformedSchema = schema.toJSONSchema();
            assert.deepEqual(
                transformedSchema,
                {
                    type: 'boolean',
                    id: 'id',
                    default: true,
                    title: 'title',
                    description: 'desc'
                }
            );
        });
    });
});
