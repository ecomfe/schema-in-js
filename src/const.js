export const REQUIRED = Symbol('required');
export const TITLE = Symbol('title');
export const DESCRIPTION = Symbol('description');

// for string
export const PATTERN = Symbol('pattern');
export const MAX_LENGTH = Symbol('maxLength');
export const MIN_LENGTH = Symbol('minLength');

// for object
export const PROPERTIES = Symbol('properties');
export const PATTERN_PROPERTIES = Symbol('patternProperties');
export const ADDITIONAL_PROPERTIES = Symbol('additionalProperties');
export const DEPENDENCIES = Symbol('dependencies');
export const MAX_PROPERTIES = Symbol('maxProperties');
export const MIN_PROPERTIES = Symbol('minProperties');

// for number
export const MINIMUM = Symbol('minimum');
export const MAXIMUM = Symbol('maximum');
export const EXCLUSIVE_MINIMUM = Symbol('exclusiveMinimum');
export const EXCLUSIVE_MAXIMUM = Symbol('exclusiveMaximum');
export const MULTILE_OF = Symbol('multipleOf');

// for array
export const ITEMS = Symbol('items');
export const MAX_ITEMS = Symbol('maxItems');
export const MIN_ITEMS = Symbol('minItems');
export const ADDITIONAL_ITEMS = Symbol('additionalItems');
export const UNIQUE_ITEMS = Symbol('uniqueItems');
