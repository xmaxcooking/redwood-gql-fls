import type { QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const user: QueryResolvers['user'] = ({ id }) => {
  if (context.currentUser.id !== id) {
    throw new Error('Not authorized')
  } else {
    return db.user.findUnique({
      where: { id },
    })
  }
}
