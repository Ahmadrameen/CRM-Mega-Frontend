import { client } from '../client'

export interface EditUserProps {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
  role?: string
}

export function editUser(data: EditUserProps, id: string) {
  return client.put(`/api/v1/users/${id}`, data)
}
