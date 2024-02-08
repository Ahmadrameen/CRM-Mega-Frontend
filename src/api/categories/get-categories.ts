import { client } from '../client'
import type { Category } from '../types'

interface JSONScheme {
  data: Category[]
}

export const getCategories = () => client.get<JSONScheme>('/api/v1/categories')
