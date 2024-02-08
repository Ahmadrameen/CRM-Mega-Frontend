import { client } from '../client'
import type { Role } from '../types'

interface JSONScheme {
  data: Role[]
}

export const getRoles = () => client.get<JSONScheme>('/api/v1/roles')
