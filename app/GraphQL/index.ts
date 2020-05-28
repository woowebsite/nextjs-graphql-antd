import * as glue from 'schemaglue';
export { schemaDirectives } from './directives';
export const { schema, resolver } = glue('app/GraphQL', { mode: 'ts' });
