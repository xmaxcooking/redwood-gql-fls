import type {
  QueryResolvers,
  MutationResolvers,
  UserPostPermissionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userPostPermissions: QueryResolvers['userPostPermissions'] =
  () => {
    return db.userPostPermission.findMany()
  }

export const userPostPermission: QueryResolvers['userPostPermission'] = ({
  id,
}) => {
  return db.userPostPermission.findUnique({
    where: { id },
  })
}

export const createUserPostPermission: MutationResolvers['createUserPostPermission'] =
  ({ input }) => {
    return db.userPostPermission.create({
      data: input,
    })
  }

export const updateUserPostPermission: MutationResolvers['updateUserPostPermission'] =
  ({ id, input }) => {
    return db.userPostPermission.update({
      data: input,
      where: { id },
    })
  }

export const deleteUserPostPermission: MutationResolvers['deleteUserPostPermission'] =
  ({ id }) => {
    return db.userPostPermission.delete({
      where: { id },
    })
  }

export const UserPostPermission: UserPostPermissionRelationResolvers = {
  User: (_obj, { root }) => {
    return db.userPostPermission.findUnique({ where: { id: root?.id } }).User()
  },
  Post: (_obj, { root }) => {
    return db.userPostPermission.findUnique({ where: { id: root?.id } }).Post()
  },
}
