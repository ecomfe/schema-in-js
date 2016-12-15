/**
 * schema in js
 *
 * @file schema unit test
 * @author hiby(yanghuabei@outlook.com)
 */

import {assert} from 'chai';
import {Schema} from '../../../src/types/schema';
import {ID, REQUIRED, TITLE, DESCRIPTION, DEFAULT, ENUM} from '../../../src/const';

describe('types.schema', function () {
    it('Schema should be a function', function () {
        assert.typeOf(Schema, 'function');
    });

    let schema = new Schema();

    it('Property type should be "null"', function () {
        assert.equal(schema.type, 'null');
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
        let values = [];
        let cases = [
            ['id', 'id', ID],
            ['title', 'title', TITLE],
            ['description', 'description', DESCRIPTION],
            ['enum', values, ENUM],
            ['default', null, DEFAULT],
            ['mayBe', false, REQUIRED],
            ['required', false, REQUIRED]
        ];

        cases.forEach(([method, value, property]) => {
            schema[method](value);
            assert.equal(schema[property], value);
        });
    });

    describe('Schema.toJSONSchema', function () {
        it('toJSONSchema method should return expected json schema', function () {
            schema.title('title').desc('desc').mayBe();
            schema = schema.toJSONSchema();
            assert.deepEqual(schema, {
                type: 'null',
                title: 'title',
                description: 'desc'
            });
        });
    });
});
