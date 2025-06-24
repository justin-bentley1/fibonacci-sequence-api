import { createServer } from 'node:http';
import { createYoga, useReadinessCheck } from 'graphql-yoga';
import { schema } from './schema';
import { usePrometheus } from '@graphql-yoga/plugin-prometheus'


const yoga = createYoga({
  schema,
  healthCheckEndpoint: '/live',
  plugins: [
    schema,
    usePrometheus({
      endpoint: '/metrics', // optional, default is `/metrics`, you can disable it by setting it to `false` if registry is configured in "push" mode
      // Optional, see default values below
      metrics: {
        // By default, these are the metrics that are enabled:
        graphql_envelop_request_time_summary: true,
        graphql_envelop_phase_parse: true,
        graphql_envelop_phase_validate: true,
        graphql_envelop_phase_context: true,
        graphql_envelop_phase_execute: true,
        graphql_envelop_phase_subscribe: true,
        graphql_envelop_error_result: true,
        graphql_envelop_deprecated_field: true,
        graphql_envelop_request_duration: true,
        graphql_envelop_schema_change: true,
        graphql_envelop_request: true,
        graphql_yoga_http_duration: true,

        // This metric is disabled by default.
        // Warning: enabling resolvers level metrics will introduce significant overhead
        graphql_envelop_execute_resolver: false
      }
    }),
    useReadinessCheck({
      endpoint: '/ready', // default
      check: async () => {
        try {
          // Add any depedent services below. e.g db check
          // await checkDbAvailable()
          // if true, respond with 200 OK
          return false;
        } catch (err) {
          // log the error on the server for debugging purposes
          console.error(err)
          // if false, respond with 503 Service Unavailable and no bdy
          return false;
        }
      }
    })
  ]
});
const server = createServer(yoga);

server.listen(3000, () => {
  console.log('GraphQL API running at http://localhost:3000/graphql');
});
