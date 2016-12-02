import _ from 'lodash';

/**
 * 清理对象中无用的键值对
 *
 * 默认会去除所有值为`null`、`undefined`以及空字符串`""`的键值对
 *
 * 如果提供了`defaults`参数，则额外去除值与`defaults`的同名属性相同的键值对
 *
 * @param {Object} object 输入的对象
 * @param {Object} [defaults] 用于提供属性默认值的参照对象
 * @param {boolean} [deep=false] 是否深度清理，即遇到属性值为对象继续递归清理
 * @return {Object} 清理后的新对象
 */
export function purify(object, defaults = {}, deep) {
    let purifiedObject = {};
    _.each(
        object,
        (value, key) => {
            let isDefaultNull = value == null || value === '';
            let isInDefaults = defaults.hasOwnProperty(key) && defaults[key] === value;
            if (!isDefaultNull && !isInDefaults) {
                if (deep && _.isPlainObject(value)) {
                    purifiedObject[key] = purify(value, defaults[key], deep);
                }
                else {
                    purifiedObject[key] = value;
                }
            }
        }
    );

    return purifiedObject;
};

/**
 * Assign value only if the value is not null or empty.
 *
 * @param {Object} obj Target object.
 * @param {string} key Property name.
 * @param {Mixed} value Property value.
 * @return {Object}
 */
export function assignIfNotEmptyOrNull(obj, key, value) {
    if (_.isObject(value)) {
        if (!_.isEmpty(value)) {
            obj[key] = value;
        }
    }
    else if (value != null) {
        obj[key] = value;
    }
    return obj;
}

export function isSchema(obj) {
    return _.isObject(obj);
}
