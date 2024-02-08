import { client } from '../client'
import { csrfCookie } from './csrf-cookie'

export interface LoginProps {
  email: string
  password: string
}

export async function login(data: LoginProps) {
  await csrfCookie()

  return client.post('login', data)
}
