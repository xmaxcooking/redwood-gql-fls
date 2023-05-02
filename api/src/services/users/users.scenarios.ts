import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String8416718',
        hashedPassword: 'String',
        salt: 'String',
        roles: 'String',
      },
    },
    two: {
      data: {
        email: 'String7913820',
        hashedPassword: 'String',
        salt: 'String',
        roles: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
