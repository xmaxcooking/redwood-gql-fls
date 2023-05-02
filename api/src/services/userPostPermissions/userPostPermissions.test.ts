import type { UserPostPermission } from '@prisma/client'

import {
  userPostPermissions,
  userPostPermission,
  createUserPostPermission,
  updateUserPostPermission,
  deleteUserPostPermission,
} from './userPostPermissions'
import type { StandardScenario } from './userPostPermissions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userPostPermissions', () => {
  scenario(
    'returns all userPostPermissions',
    async (scenario: StandardScenario) => {
      const result = await userPostPermissions()

      expect(result.length).toEqual(
        Object.keys(scenario.userPostPermission).length
      )
    }
  )

  scenario(
    'returns a single userPostPermission',
    async (scenario: StandardScenario) => {
      const result = await userPostPermission({
        id: scenario.userPostPermission.one.id,
      })

      expect(result).toEqual(scenario.userPostPermission.one)
    }
  )

  scenario(
    'creates a userPostPermission',
    async (scenario: StandardScenario) => {
      const result = await createUserPostPermission({
        input: {
          userId: scenario.userPostPermission.two.userId,
          postId: scenario.userPostPermission.two.postId,
          updatedAt: '2023-05-02T12:35:27.472Z',
          role: 'String',
        },
      })

      expect(result.userId).toEqual(scenario.userPostPermission.two.userId)
      expect(result.postId).toEqual(scenario.userPostPermission.two.postId)
      expect(result.updatedAt).toEqual(new Date('2023-05-02T12:35:27.472Z'))
      expect(result.role).toEqual('String')
    }
  )

  scenario(
    'updates a userPostPermission',
    async (scenario: StandardScenario) => {
      const original = (await userPostPermission({
        id: scenario.userPostPermission.one.id,
      })) as UserPostPermission
      const result = await updateUserPostPermission({
        id: original.id,
        input: { updatedAt: '2023-05-03T12:35:27.472Z' },
      })

      expect(result.updatedAt).toEqual(new Date('2023-05-03T12:35:27.472Z'))
    }
  )

  scenario(
    'deletes a userPostPermission',
    async (scenario: StandardScenario) => {
      const original = (await deleteUserPostPermission({
        id: scenario.userPostPermission.one.id,
      })) as UserPostPermission
      const result = await userPostPermission({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
