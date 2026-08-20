export type AdminRole =
  | 'Super Admin'
  | 'System Admin'
  | 'Finance Admin'
  | 'Field Operations Admin'
  | 'Content Admin'

export type Status =
  | 'Active'
  | 'Pending'
  | 'Verified'
  | 'Rejected'
  | 'Blocked'
  | 'Completed'
  | 'Failed'
  | 'Draft'
  | 'Published'
  | 'Disabled'
  | 'Scheduled'
  | 'In Progress'
  | 'Needs Review'

export interface AdminSession {
  email: string
  role: AdminRole
  remember: boolean
}

export interface User {
  id: string
  name: string
  mobile: string
  district: string
  type: 'Farmer' | 'Land Owner'
  subscription: 'Free' | 'Premium'
  profileStatus: 'Complete' | 'Incomplete' | 'N/A'
  verification: 'Verified' | 'Pending' | 'Rejected' | 'Blocked'
  joined: string
  landSize: string
  soilType: string
  cropPlan: string
}

export interface Subscription {
  id: string
  user: string
  plan: 'Free' | 'Premium Monthly' | 'Premium Annual'
  amount: number
  started: string
  renewal: string
  status: Status
}

export interface Payment {
  id: string
  user: string
  amount: number
  method: string
  date: string
  status: 'Completed' | 'Failed' | 'Pending'
  reference: string
}

export interface Employee {
  id: string
  name: string
  role: string
  department: string
  mobile: string
  district: string
  joiningDate: string
  status: 'Active' | 'Draft' | 'Disabled'
}

export interface SoilTask {
  id: string
  farmer: string
  district: string
  assignedTo: string
  visitDate: string
  crop: string
  status: 'Pending' | 'Scheduled' | 'In Progress' | 'Completed'
}

export interface Lease {
  id: string
  owner: string
  district: string
  acreage: number
  monthlyRent: number
  documentsVerified: boolean
  status: 'Pending' | 'Approved' | 'Rejected' | 'Active'
}

export interface Crop {
  id: string
  name: string
  category: string
  season: string
  duration: string
  status: 'Published' | 'Draft' | 'Disabled'
}

export interface SoilType {
  id: string
  name: string
  phRange: string
  districts: string[]
  mappedCrops: string[]
  status: 'Published' | 'Draft'
}

export interface FertilizerRule {
  id: string
  crop: string
  soilType: string
  fertilizer: string
  dosage: string
  version: string
  status: 'Published' | 'Draft' | 'Needs Review' | 'Disabled'
}

export interface MarketPrice {
  id: string
  crop: string
  market: string
  price: number
  unit: string
  trend: number
  updated: string
}

export interface AlertRule {
  id: string
  name: string
  event: string
  districts: string[]
  channel: string
  status: 'Active' | 'Draft' | 'Disabled'
}

export interface NotificationTemplate {
  id: string
  name: string
  channel: 'SMS' | 'WhatsApp' | 'Email' | 'In-App'
  language: string
  updated: string
  status: 'Published' | 'Draft'
}

export interface Translation {
  id: string
  key: string
  english: string
  gujarati: string
  hindi: string
  status: 'Published' | 'Draft' | 'Needs Review'
}

export interface RecommendationRule {
  id: string
  name: string
  model: string
  weight: number
  precision: number
  version: string
  status: 'Active' | 'Draft' | 'Needs Review'
}
