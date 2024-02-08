import { client } from '../client'

export interface CreateRequestProps {
  content: string
  customer_id: string
  category_id: string
  status_id: string
}

export function createRequest(data: CreateRequestProps) {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return client.post('/api/v1/requests', formData)
}
