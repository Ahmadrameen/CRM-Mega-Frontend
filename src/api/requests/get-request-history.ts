import { client } from '../client'
import type { RequestHistory } from '../types'

interface JSONScheme {
  data: RequestHistory[]
}

export function getRequestHistory(id: string) {
  return client.get<JSONScheme>(`api/v1/request-histories/${id}`)
}
