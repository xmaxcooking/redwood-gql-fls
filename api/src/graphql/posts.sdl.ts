export const schema = gql`
  type Post {
    id: String!
    title: String!
    body: String!
    createdAt: DateTime!
  }

  type Query {
    posts: [Post!]! @requireAuth
    post(id: String!): Post @requireAuth
  }

  input CreatePostInput {
    title: String!
    body: String!
  }

  input UpdatePostInput {
    title: String
    body: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: String!, input: UpdatePostInput!): Post!
      @requireAuth
      @requireAccess(
        permission: "write"
        for: "Post"
        check: "UserPostPermission"
      )
    deletePost(id: String!): Post!
      @requireAuth
      @requireAccess(
        permission: "delete"
        for: "Post"
        check: "UserPostPermission"
      )
  }
`
