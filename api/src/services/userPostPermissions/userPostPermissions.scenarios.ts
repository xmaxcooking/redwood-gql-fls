import type { Prisma, UserPostPermission } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserPostPermissionCreateArgs>({
  userPostPermission: {
    one: {
      data: {
        updatedAt: '2023-05-02T12:35:27.493Z',
        role: 'String',
        User: {
          create: {
            email: 'String9342439',
            hashedPassword: 'String',
            salt: 'String',
            roles: 'String',
          },
        },
        Post: { create: { title: 'String', body: 'String' } },
      },
    },
    two: {
      data: {
        updatedAt: '2023-05-02T12:35:27.493Z',
        role: 'String',
        User: {
          create: {
            email: 'String5192536',
            hashedPassword: 'String',
            salt: 'String',
            roles: 'String',
          },
        },
        Post: { create: { title: 'String', body: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  UserPostPermission,
  'userPostPermission'
>
