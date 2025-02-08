import { order } from "./order";
import { productSchema } from "./product";
import { type SchemaTypeDefinition } from 'sanity'

export const schemaTypes = [productSchema, order];
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [productSchema],
  }
  