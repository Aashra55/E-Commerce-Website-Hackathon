import { productSchema } from "./product";
import { type SchemaTypeDefinition } from 'sanity'

export const schemaTypes = [productSchema];
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [productSchema],
  }