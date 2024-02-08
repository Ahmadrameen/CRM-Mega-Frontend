import { client } from '../client'

export function deleteRequest(id: string) {
  return client.delete(`api/v1/requests/${id}`)
}
