import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany({
    where: {
      OR: [
        {
          UserPermissions: {
            some: {
              AND: [
                {
                  userId: context.currentUser.id,
                },
                {
                  permission: {
                    contains: 'read',
                  },
                },
              ],
            },
          },
        },
        {
          createdById: context.currentUser.id,
        },
      ],
    },
  })
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  return db.post.create({
    data: {
      title: input.title,
      body: input.body,
      createdBy: {
        connect: { id: context.currentUser.id },
      },
      UserPermissions: {
        create: {
          permission: 'read,write',
          User: {
            connect: { id: context.currentUser.id },
          },
        },
      },
    },
  })
}

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = async ({ id }) => {
  const [_relations, post] = await db.$transaction([
    db.userPostPermission.deleteMany({
      where: {
        postId: id,
      },
    }),
    db.post.delete({
      where: { id },
    }),
  ])
  return post
}
