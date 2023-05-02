export const schema = gql`
  type User {
    id: String!
    name: String
    email: String!
  }

  type Query {
    user(id: String!): User @requireAuth
  }
`
