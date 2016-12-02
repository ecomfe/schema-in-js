export {Str} from './types/string';

export class Schema {
    toJSONSchema(schemaInJS) {
        if (schemaInJS.toJSONSchema) {
            return schemaInJS.toJSONSchema();
        }
    }
}
