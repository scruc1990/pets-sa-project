import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const graphQlUri =
  import.meta.env.VITE_GRAPHQL_URL ??
  `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/graphql`;

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: graphQlUri }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clientes: { merge: false },
          medicamentos: { merge: false },
          mascotas: { merge: false },
        },
      },
    },
  }),
});