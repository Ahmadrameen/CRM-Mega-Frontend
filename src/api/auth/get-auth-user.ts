import { client } from '../client'

export function getAuthUser() {
  return client.get('api/v1/users')
}
