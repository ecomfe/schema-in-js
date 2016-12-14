import {assert} from 'chai';
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
    PROPERTIES,
    ID,
    TITLE,
    DESCRIPTION
} from '../../src/const';

describe('types', () => {
    it('Types should be a function', () => {
        assert.typeOf(Types, 'function');
    });

    let t = null;
    beforeEach(() => {t = new Types();});
    afterEach(() => {t = undefined;});

    it('All type of schema should be accessable from Types instance', () => {
        assert.instanceOf(t.str, Str);
        assert.instanceOf(t.int, Int);
        assert.instanceOf(t.bool, Bool);
        assert.instanceOf(t.num, Num);
        assert.instanceOf(t.arr, Arr);
        assert.instanceOf(t.obj, Obj);
    });

    it('Types.prototype.fromPlainObjectToObjectSchema should work well', () => {
        let nameSchema = t.str.size(10);
        let ageSchema = t.int.range(100, 10);
        let schema = {
            name: nameSchema,
            age: ageSchema,
            [ADDITIONAL_PROPERTIES]: false,
            [DEPENDENCIES]: {age: ['name']},
            [ID]: 'test',
            [TITLE]: 'title',
            [DESCRIPTION]: 'description',
            [MAX_PROPERTIES]: 6,
            [MIN_PROPERTIES]: 1,
            [PATTERN_PROPERTIES]: '(name)|(age)|(\w.*Prop$)'
        };
        let transformed = t.fromPlainObjectToObjectSchema(schema);
        assert.instanceOf(transformed, Obj);
        assert.deepEqual(
            transformed[PROPERTIES],
            {
                name: nameSchema,
                age: ageSchema
            }
        );
        assert.equal(transformed[ADDITIONAL_PROPERTIES], false);
        assert.deepEqual(transformed[DEPENDENCIES], {age: ['name']});
        assert.equal(transformed[ID], 'test');
        assert.equal(transformed[TITLE], 'title');
        assert.equal(transformed[DESCRIPTION], 'description');
        assert.equal(transformed[MAX_PROPERTIES], 6);
        assert.equal(transformed[MIN_PROPERTIES], 1);
        assert.equal(transformed[PATTERN_PROPERTIES], '(name)|(age)|(\w.*Prop$)');
    });

    it('Types.prototype.transformToJSONSchema should work well with Schema param', () => {
        let schema = new Obj();
        let transformedSchema = t.transformToJSONSchema(schema);
        assert.deepEqual(
            transformedSchema,
            {type: 'object'}
        );
    });

    it('Types.prototype.transformToJSONSchema should work well with plain object param', () => {
        let schema = {
            name: t.str.maxLength(10)
        };
        let transformedSchema = t.transformToJSONSchema(schema);
        assert.deepEqual(
            transformedSchema,
            {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        maxLength: 10
                    }
                },
                required: ['name']
            }
        );
    });

    it('Types.prototype.transformToJSONSchema should throw with empty plain object param', () => {
        assert.throw(t.transformToJSONSchema.bind(t, {}), Error);
    });
});