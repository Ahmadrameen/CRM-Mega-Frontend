import { client } from '../client'

export function logout() {
  return client.post('logout')
}
