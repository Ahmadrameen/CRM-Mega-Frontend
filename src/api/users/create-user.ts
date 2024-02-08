import { client } from '../client'

export interface CreateUserProps {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: string
}

export function createUser(data: CreateUserProps) {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return client.post('/api/v1/users', formData)
}
