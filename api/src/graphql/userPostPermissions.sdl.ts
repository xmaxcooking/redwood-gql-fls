export const schema = gql`
  type UserPostPermission {
    id: String!
    userId: String!
    postId: String!
    permission: String!
  }
`
