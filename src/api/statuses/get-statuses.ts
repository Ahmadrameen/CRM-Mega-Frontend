import { client } from '../client'
import type { Status } from '../types'

interface JSONScheme {
  data: Status[]
}

export const getStatuses = () => client.get<JSONScheme>('/api/v1/statuses')
