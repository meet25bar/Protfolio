import type {
  AlertRule,
  Crop,
  Employee,
  FertilizerRule,
  Lease,
  MarketPrice,
  NotificationTemplate,
  Payment,
  RecommendationRule,
  SoilTask,
  SoilType,
  Subscription,
  Translation,
  User,
} from '../types'

export const users: User[] = [
  {
    id: 'KS-USR-1001',
    name: 'Vivek Patel',
    mobile: '+91 98765 43210',
    district: 'Anand',
    type: 'Farmer',
    subscription: 'Premium',
    profileStatus: 'Complete',
    verification: 'Verified',
    joined: '12 Jan 2026',
    landSize: '2.5 Acres',
    soilType: 'Black Soil',
    cropPlan: 'Tomato',
  },
  {
    id: 'KS-USR-1002',
    name: 'Ramesh Patel',
    mobile: '+91 98765 11111',
    district: 'Anand',
    type: 'Land Owner',
    subscription: 'Free',
    profileStatus: 'N/A',
    verification: 'Pending',
    joined: '11 Jan 2026',
    landSize: '6 Acres',
    soilType: 'Alluvial Soil',
    cropPlan: 'Wheat',
  },
  {
    id: 'KS-USR-1003',
    name: 'Ravi Desai',
    mobile: '+91 98765 22222',
    district: 'Nadiad',
    type: 'Farmer',
    subscription: 'Premium',
    profileStatus: 'Complete',
    verification: 'Pending',
    joined: '10 Jan 2026',
    landSize: '3 Acres',
    soilType: 'Loamy Soil',
    cropPlan: 'Cotton',
  },
  {
    id: 'KS-USR-1004',
    name: 'Amit Parmar',
    mobile: '+91 98765 33333',
    district: 'Borsad',
    type: 'Farmer',
    subscription: 'Free',
    profileStatus: 'Incomplete',
    verification: 'Rejected',
    joined: '09 Jan 2026',
    landSize: '1.8 Acres',
    soilType: 'Sandy Soil',
    cropPlan: 'Groundnut',
  },
  {
    id: 'KS-USR-1005',
    name: 'Priya Shah',
    mobile: '+91 98765 44444',
    district: 'Vadodara',
    type: 'Land Owner',
    subscription: 'Free',
    profileStatus: 'N/A',
    verification: 'Verified',
    joined: '08 Jan 2026',
    landSize: '10 Acres',
    soilType: 'Black Soil',
    cropPlan: 'Rice',
  },
]

export const subscriptions: Subscription[] = [
  { id: 'SUB-2401', user: 'Vivek Patel', plan: 'Premium Annual', amount: 2499, started: '12 Jan 2026', renewal: '12 Jan 2027', status: 'Active' },
  { id: 'SUB-2402', user: 'Ravi Desai', plan: 'Premium Monthly', amount: 299, started: '10 Jan 2026', renewal: '10 Feb 2026', status: 'Active' },
  { id: 'SUB-2403', user: 'Priya Shah', plan: 'Free', amount: 0, started: '08 Jan 2026', renewal: '—', status: 'Active' },
  { id: 'SUB-2404', user: 'Amit Parmar', plan: 'Premium Monthly', amount: 299, started: '05 Jan 2026', renewal: '05 Feb 2026', status: 'Pending' },
]

export const payments: Payment[] = [
  { id: 'PAY-8841', user: 'Vivek Patel', amount: 2499, method: 'UPI', date: '12 Jan 2026', status: 'Completed', reference: 'UPI401298' },
  { id: 'PAY-8842', user: 'Ravi Desai', amount: 299, method: 'Card', date: '10 Jan 2026', status: 'Completed', reference: 'CARD8721' },
  { id: 'PAY-8843', user: 'Amit Parmar', amount: 299, method: 'UPI', date: '09 Jan 2026', status: 'Failed', reference: 'UPI401176' },
  { id: 'PAY-8844', user: 'Ramesh Patel', amount: 899, method: 'Net Banking', date: '08 Jan 2026', status: 'Pending', reference: 'NB192002' },
]

export const employees: Employee[] = [
  { id: 'EMP-8492', name: 'Rajesh Sharma', role: 'Field Supervisor', department: 'Soil Testing', mobile: '+91 98250 10101', district: 'Anand', joiningDate: '12 Oct 2024', status: 'Active' },
  { id: 'EMP-8493', name: 'Mehul Joshi', role: 'Field Agent', department: 'Soil Testing', mobile: '+91 98250 20202', district: 'Mehsana', joiningDate: '18 Nov 2024', status: 'Active' },
  { id: 'EMP-8494', name: 'Nisha Patel', role: 'Verification Officer', department: 'Operations', mobile: '+91 98250 30303', district: 'Vadodara', joiningDate: '03 Dec 2024', status: 'Active' },
  { id: 'EMP-8495', name: 'Aarav Trivedi', role: 'Content Reviewer', department: 'Data Management', mobile: '+91 98250 40404', district: 'Rajkot', joiningDate: '11 Jan 2025', status: 'Draft' },
]

export const soilTasks: SoilTask[] = [
  { id: 'KS-ST-2025-001', farmer: 'Vivek Patel', district: 'Anand', assignedTo: 'Rajesh Sharma', visitDate: '16 Jan 2026', crop: 'Wheat', status: 'Scheduled' },
  { id: 'KS-ST-2025-002', farmer: 'Ramesh Patel', district: 'Anand', assignedTo: 'Unassigned', visitDate: '—', crop: 'Cotton', status: 'Pending' },
  { id: 'KS-ST-2025-003', farmer: 'Amit Parmar', district: 'Borsad', assignedTo: 'Mehul Joshi', visitDate: '14 Jan 2026', crop: 'Rice', status: 'In Progress' },
  { id: 'KS-ST-2025-004', farmer: 'Priya Shah', district: 'Vadodara', assignedTo: 'Rajesh Sharma', visitDate: '11 Jan 2026', crop: 'Tomato', status: 'Completed' },
]

export const leases: Lease[] = [
  { id: 'KS-LS-1101', owner: 'Priya Shah', district: 'Vadodara', acreage: 10, monthlyRent: 45000, documentsVerified: true, status: 'Pending' },
  { id: 'KS-LS-1102', owner: 'Ramesh Patel', district: 'Anand', acreage: 6, monthlyRent: 28000, documentsVerified: false, status: 'Pending' },
  { id: 'KS-LS-1103', owner: 'Jignesh Solanki', district: 'Rajkot', acreage: 12, monthlyRent: 56000, documentsVerified: true, status: 'Approved' },
  { id: 'KS-LS-1104', owner: 'Dhruv Mehta', district: 'Mehsana', acreage: 4.5, monthlyRent: 22000, documentsVerified: true, status: 'Active' },
]

export const crops: Crop[] = [
  { id: 'CRP-001', name: 'Wheat', category: 'Cereal', season: 'Rabi', duration: '120–150 days', status: 'Published' },
  { id: 'CRP-002', name: 'Cotton', category: 'Fiber', season: 'Kharif', duration: '150–180 days', status: 'Published' },
  { id: 'CRP-003', name: 'Groundnut', category: 'Oilseed', season: 'Kharif', duration: '100–130 days', status: 'Published' },
  { id: 'CRP-004', name: 'Dragon Fruit', category: 'Fruit', season: 'All Season', duration: 'Perennial', status: 'Draft' },
]

export const soilTypes: SoilType[] = [
  { id: 'SOIL-01', name: 'Black Soil', phRange: '6.5–8.5', districts: ['Anand', 'Vadodara', 'Rajkot'], mappedCrops: ['Cotton', 'Wheat'], status: 'Published' },
  { id: 'SOIL-02', name: 'Alluvial Soil', phRange: '6.0–8.0', districts: ['Ahmedabad', 'Kheda'], mappedCrops: ['Rice', 'Wheat'], status: 'Published' },
  { id: 'SOIL-03', name: 'Sandy Soil', phRange: '5.5–7.5', districts: ['Kutch', 'Banaskantha'], mappedCrops: ['Groundnut'], status: 'Draft' },
]

export const fertilizerRules: FertilizerRule[] = [
  { id: 'FRT-101', crop: 'Wheat', soilType: 'Black Soil', fertilizer: 'Urea + SSP', dosage: '110 + 75 kg/acre', version: 'v2.1', status: 'Published' },
  { id: 'FRT-102', crop: 'Cotton', soilType: 'Black Soil', fertilizer: 'NPK 20:20:0', dosage: '90 kg/acre', version: 'v1.8', status: 'Needs Review' },
  { id: 'FRT-103', crop: 'Rice', soilType: 'Alluvial Soil', fertilizer: 'DAP + Urea', dosage: '60 + 80 kg/acre', version: 'v3.0', status: 'Published' },
]

export const marketPrices: MarketPrice[] = [
  { id: 'MKT-001', crop: 'Wheat', market: 'Anand APMC', price: 2480, unit: 'quintal', trend: 3.8, updated: 'Today, 09:30' },
  { id: 'MKT-002', crop: 'Cotton', market: 'Rajkot APMC', price: 7240, unit: 'quintal', trend: -1.2, updated: 'Today, 09:20' },
  { id: 'MKT-003', crop: 'Groundnut', market: 'Gondal APMC', price: 6150, unit: 'quintal', trend: 2.4, updated: 'Today, 08:55' },
  { id: 'MKT-004', crop: 'Tomato', market: 'Vadodara APMC', price: 1860, unit: 'quintal', trend: 6.1, updated: 'Yesterday' },
]

export const alertRules: AlertRule[] = [
  { id: 'ALT-01', name: 'Heavy Rain Warning', event: 'Rainfall > 80mm', districts: ['Anand', 'Kheda'], channel: 'WhatsApp + SMS', status: 'Active' },
  { id: 'ALT-02', name: 'Heat Wave Advisory', event: 'Temperature > 43°C', districts: ['Rajkot', 'Kutch'], channel: 'In-App + SMS', status: 'Active' },
  { id: 'ALT-03', name: 'High Wind Alert', event: 'Wind > 45 km/h', districts: ['All'], channel: 'WhatsApp', status: 'Draft' },
]

export const templates: NotificationTemplate[] = [
  { id: 'TPL-01', name: 'Soil Report Ready', channel: 'WhatsApp', language: 'Gujarati', updated: '12 Jan 2026', status: 'Published' },
  { id: 'TPL-02', name: 'Subscription Renewal', channel: 'Email', language: 'English', updated: '10 Jan 2026', status: 'Published' },
  { id: 'TPL-03', name: 'Weather Warning', channel: 'SMS', language: 'Hindi', updated: '09 Jan 2026', status: 'Draft' },
]

export const translations: Translation[] = [
  { id: 'TR-01', key: 'dashboard.welcome', english: 'Welcome back', gujarati: 'ફરી સ્વાગત છે', hindi: 'वापसी पर स्वागत है', status: 'Published' },
  { id: 'TR-02', key: 'soil.report_ready', english: 'Your soil report is ready', gujarati: 'તમારો જમીન અહેવાલ તૈયાર છે', hindi: 'आपकी मिट्टी रिपोर्ट तैयार है', status: 'Published' },
  { id: 'TR-03', key: 'lease.pending', english: 'Lease verification pending', gujarati: '', hindi: '', status: 'Needs Review' },
]

export const recommendationRules: RecommendationRule[] = [
  { id: 'AI-101', name: 'Crop Suitability Score', model: 'CropMatch v4', weight: 0.34, precision: 94.2, version: '4.2.1', status: 'Active' },
  { id: 'AI-102', name: 'Yield Projection', model: 'YieldNet', weight: 0.26, precision: 91.8, version: '3.8.0', status: 'Active' },
  { id: 'AI-103', name: 'Market Opportunity', model: 'MarketSense', weight: 0.18, precision: 88.6, version: '2.5.2', status: 'Needs Review' },
]
