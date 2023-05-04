import {
  AuthenticationError,
  createValidatorDirective,
  ForbiddenError,
  UserInputError,
  ValidatorDirectiveFunc,
} from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
//import { logger } from 'src/lib/logger'

export const schema = gql`
  """
  Use @requireAccess to validate access to a field, query or mutation.
  """
  directive @requireAccess(
    permission: String
    for: String
    check: String
  ) on FIELD_DEFINITION
`

const validate: ValidatorDirectiveFunc = async ({ context, directiveArgs }) => {
  if (!context.currentUser) {
    throw new AuthenticationError(
      'You must be logged in to access this resource'
    )
  }

  if (!(directiveArgs.check in db)) {
    throw new UserInputError(`The model to check access on does not exist`)
  }

  const permission = await db[directiveArgs.check].findFirst({
    where: {
      AND: [
        {
          User: {
            id: context.currentUser.id,
          },
        },
        {
          [directiveArgs.for]: {
            id: context.params['variables']['id'],
          },
        },
        {
          permission: {
            contains: directiveArgs.permission,
          },
        },
      ],
    },
  })

  if (!permission) {
    throw new ForbiddenError(
      `You do not have ${directiveArgs.permission} permission to access this resource`
    )
  }
}

const requireAccess = createValidatorDirective(schema, validate)

export default requireAccess
