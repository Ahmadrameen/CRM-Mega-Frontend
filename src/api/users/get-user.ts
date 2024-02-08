import { client } from '../client'
import type { User } from '../types'

interface UserWithRole extends User {
  role: string
}

interface JSONScheme {
  data: UserWithRole
}

export function getUser(id: string) {
  return client.get<JSONScheme>(`api/v1/user/${id}`)
}
