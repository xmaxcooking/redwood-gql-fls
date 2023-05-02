export const schema = gql`
  type UserPostPermission {
    id: String!
    userId: String!
    User: User!
    postId: String!
    Post: Post!
    createdAt: DateTime!
    updatedAt: DateTime!
    role: String!
  }

  type Query {
    userPostPermissions: [UserPostPermission!]! @requireAuth
    userPostPermission(id: String!): UserPostPermission @requireAuth
  }

  input CreateUserPostPermissionInput {
    userId: String!
    postId: String!
    role: String!
  }

  input UpdateUserPostPermissionInput {
    userId: String
    postId: String
    role: String
  }

  type Mutation {
    createUserPostPermission(
      input: CreateUserPostPermissionInput!
    ): UserPostPermission! @requireAuth
    updateUserPostPermission(
      id: String!
      input: UpdateUserPostPermissionInput!
    ): UserPostPermission! @requireAuth
    deleteUserPostPermission(id: String!): UserPostPermission! @requireAuth
  }
`
