import { client } from '../client'
import type { Request } from '../types'

interface JSONScheme {
  data: Request[]
}

export function getRequests() {
  return client.get<JSONScheme>('api/v1/requests')
}
