import {assert} from 'chai';
import {purify, assignIfNotEmptyOrNull} from '../../src/util';

describe('util', function () {
    it('util.purify should work well', function () {
        let obj = {
            a: null,
            b: undefined,
            c: '',
            d: 0
        };
        assert.deepEqual(purify(obj), {d: 0});
    });

    it('util.assignIfNotEmptyOrNull should work well', function () {
        let obj = {a: 1};
        obj = assignIfNotEmptyOrNull(obj, 'b', {});
        assert.deepEqual(obj, {a: 1});

        obj = {a: 1};
        obj = assignIfNotEmptyOrNull(obj, 'b', []);
        assert.deepEqual(obj, {a: 1});

        obj = {a: 1};
        obj = assignIfNotEmptyOrNull(obj, 'b', 2);
        assert.deepEqual(obj, {a: 1, b: 2});
    });
});
