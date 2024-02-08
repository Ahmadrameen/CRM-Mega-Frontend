import { client } from '../client'

export function csrfCookie() {
  return client.get('sanctum/csrf-cookie')
}
