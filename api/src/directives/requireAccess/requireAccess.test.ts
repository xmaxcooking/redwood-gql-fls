import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAccess from './requireAccess'

describe('requireAccess directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAccess.schema).toBeTruthy()
    expect(getDirectiveName(requireAccess.schema)).toBe('requireAccess')
  })

  it('has a requireAccess throws an error if validation does not pass', () => {
    const mockExecution = mockRedwoodDirective(requireAccess, {})

    expect(mockExecution).toThrowError(
      'Implementation missing for requireAccess'
    )
  })
})
