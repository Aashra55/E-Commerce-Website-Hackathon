import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { schemaTypes } from './schema'

export const SanityConfig = defineConfig({
    name : 'default',
    title:'studio',
    basePath:'/studio',
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET!,
    token:process.env.SANITY_API_TOKEN,
    plugins:[structureTool(),visionTool()],
    schema : {
        types:schemaTypes
    },
});
