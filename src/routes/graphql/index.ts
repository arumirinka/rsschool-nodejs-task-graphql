import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './schema.js';
import depthLimit from 'graphql-depth-limit';
import { useDataLoaders } from './types/dataloader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const errors = validate(schema, parse(req.body.query), [depthLimit(5)]);

      if (errors.length) {
        return { errors };
      }

      const dataLoaders = useDataLoaders(prisma);

      return await graphql({
        schema,
        source: req.body.query,
        contextValue: { prisma, dataLoaders },
        variableValues: req.body.variables,
      });
    },
  });
};

export default plugin;
