import { order } from "./order";
import { productSchema } from "./product";
import { type SchemaTypeDefinition } from 'sanity'
import user from "./users";

export const schemaTypes = [productSchema, order, user];
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [productSchema],
  }
  