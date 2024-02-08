export interface Customer {
  account: string
  lastname: string
  id: number
  firstname: string
  phone: string
}

export interface Request {
  category: {
    id: number
    name: string
  }
  status: {
    id: number
    name: string
  }
  created_at: Date
  updated_at: Date
  content: string
  customer: Customer
  id: number
}

export interface Category {
  name: string
  id: number
  created_at: Date
  updated_at: Date
}

export interface Status {
  name: string
  id: number
  created_at: Date
  updated_at: Date
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: Date
  created_at: Date
  updated_at: Date
  role?: string
}

export interface Role {
  id: number
  name: string
}

export interface RequestHistory {
  id: number
  action: string
  user: string
  request: 1
  note: string
  created_at: Date
  updated_at: Date
}
