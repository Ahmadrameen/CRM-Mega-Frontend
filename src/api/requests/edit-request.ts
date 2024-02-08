import { client } from '../client'
import type { CreateRequestProps } from './create-request'

export function editRequest(data: CreateRequestProps, id: string) {
  return client.put(`/api/v1/requests/${id}`, data)
}
