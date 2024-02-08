import { client } from '../client'
import type { Customer } from '../types'

interface JSONScheme {
  data: Customer[]
}

export const getCustomers = () => client.get<JSONScheme>('/api/v1/customers')
