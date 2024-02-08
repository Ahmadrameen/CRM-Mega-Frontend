import { client } from '../client'

export function deleteUser(id: string) {
  return client.delete(`api/v1/users/${id}`)
}
