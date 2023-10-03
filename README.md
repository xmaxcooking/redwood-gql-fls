# Field-Level-Security (FLS) on RedwoodJS Proof-of-Concept

Welcome to the Field-Level-Security (RLS) on RedwoodJS Proof-of-Concept repository!

This repository demonstrates a proof-of-concept implementation of RLS using a custom directive `@requireAccess` in RedwoodJS. The directive checks user permissions at a field-level on top of GraphQL SDLs.

## Prerequisites

- Redwood requires [Node.js](https://nodejs.org/en/) (>=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)

## Getting Started

To get started with the repository, clone it and install the dependencies:

```bash
git clone https://github.com/xmaxcooking/redwood-gql-rls.git
cd your_repository
yarn install
```

After the installation process, migrate the database and start the development server:

```bash
yarn rw prisma migrate dev
yarn rw dev
```

Your server should now be running at http://localhost:8910.

## The `@requireAccess` Directive

The `@requireAccess` directive is utilized in our GraphQL schema definitions for mutations. It checks whether the current user has the necessary permissions to perform CRUD operations on specific resources.

Here's how it's being used in context:

```graphql
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
```

## The `@requireAccess` Directive in Detail

The @requireAccess directive, as used in the above context, takes three arguments: permission, for, and check.

- permission: Defines the type of operation (e.g., "write" or "delete")
- for: Specifies the entity on which the operation is to be performed (e.g., "Post")
- check: Specifies the permission table to check for the relevant user permissions

This directive is validated by a function in the background which checks the UserPostPermission table for a corresponding permission entry for the current user and the Post in question. Here is a brief illustration of the validation function:

```typescript
const validate: ValidatorDirectiveFunc = async ({ context, directiveArgs }) => {
  // Validation logic here...
};

const requireAccess = createValidatorDirective(schema, validate);

export default requireAccess;
```

## Database Schema

The database schema in use for this project includes the UserPostPermission table, which holds the permission entries for users and Posts. The UserPostPermission table has a many-to-one relation with the User and Post tables.

Here's a simplified representation of the schema:

```prisma
model User {
  id                  String @id @default(uuid())
  name                String?
  email               String @unique
  hashedPassword      String
  salt                String
  resetToken          String?
  resetTokenExpiresAt DateTime?
  roles               String
  PostPermissions     UserPostPermission[]
  Posts               Post[]
}

model UserPostPermission {
  id        String @id @default(uuid())
  UserId    String
  User      User   @relation(fields: [UserId], references: [id])
  PostId    String
  Post      Post   @relation(fields: [PostId], references: [id])
  permission String
}

model Post {
  id        String               @id @default(uuid())
  title     String
  body      String
  createdAt DateTime             @default(now())
  UserPostPermissions UserPostPermission[]
}
```

## Feedback and Contributions
This repository is a proof-of-concept and is open to suggestions and contributions. Feel free to share your thoughts or make a pull request.
