import { client } from '../client'
import type { User } from '../types'

interface JSONScheme {
  data: User[]
}

export function getUsers() {
  return client.get<JSONScheme>('api/v1/all-users')
}
