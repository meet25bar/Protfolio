import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  alertRules,
  crops,
  employees,
  fertilizerRules,
  leases,
  marketPrices,
  payments,
  recommendationRules,
  soilTasks,
  soilTypes,
  subscriptions,
  templates,
  translations,
  users,
} from '../data/seed'
import type {
  AdminRole,
  AdminSession,
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

export interface AdminState {
  session: AdminSession | null
  users: User[]
  subscriptions: Subscription[]
  payments: Payment[]
  employees: Employee[]
  soilTasks: SoilTask[]
  leases: Lease[]
  crops: Crop[]
  soilTypes: SoilType[]
  fertilizerRules: FertilizerRule[]
  marketPrices: MarketPrice[]
  alertRules: AlertRule[]
  templates: NotificationTemplate[]
  translations: Translation[]
  recommendationRules: RecommendationRule[]
  login: (email: string, role: AdminRole, remember: boolean) => void
  logout: () => void
  verifyUser: (id: string) => void
  rejectUser: (id: string) => void
  blockUser: (id: string) => void
  addEmployee: (employee: Omit<Employee, 'id'>) => string
  saveEmployeeDraft: (employee: Partial<Employee>) => void
  assignSoilTask: (id: string, employee: string, date?: string) => void
  cancelSoilTask: (id: string) => void
  approveLease: (id: string) => void
  rejectLease: (id: string) => void
  activateLease: (id: string) => void
  verifyLeaseDocuments: (id: string) => void
  updateMarketPrice: (id: string, price: number) => void
  publishTemplate: (id: string) => void
  approveRecommendationRule: (id: string) => void
  updateRecommendationWeight: (id: string, weight: number) => void
  resetDemo: () => void
}

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T

const initialData = () => ({
  users: clone(users),
  subscriptions: clone(subscriptions),
  payments: clone(payments),
  employees: clone(employees),
  soilTasks: clone(soilTasks),
  leases: clone(leases),
  crops: clone(crops),
  soilTypes: clone(soilTypes),
  fertilizerRules: clone(fertilizerRules),
  marketPrices: clone(marketPrices),
  alertRules: clone(alertRules),
  templates: clone(templates),
  translations: clone(translations),
  recommendationRules: clone(recommendationRules),
})

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      session: null,
      ...initialData(),
      login: (email, role, remember) => set({ session: { email, role, remember } }),
      logout: () => set({ session: null }),
      verifyUser: (id) =>
        set({ users: get().users.map((user) => (user.id === id ? { ...user, verification: 'Verified' } : user)) }),
      rejectUser: (id) =>
        set({ users: get().users.map((user) => (user.id === id ? { ...user, verification: 'Rejected' } : user)) }),
      blockUser: (id) =>
        set({ users: get().users.map((user) => (user.id === id ? { ...user, verification: 'Blocked' } : user)) }),
      addEmployee: (employee) => {
        const id = `EMP-${8500 + get().employees.length}`
        set({ employees: [...get().employees, { ...employee, id }] })
        return id
      },
      saveEmployeeDraft: (employee) => {
        const id = `EMP-${8500 + get().employees.length}`
        const draft: Employee = {
          id,
          name: employee.name || 'Untitled Employee',
          role: employee.role || 'Field Agent',
          department: employee.department || 'Soil Testing',
          mobile: employee.mobile || '—',
          district: employee.district || 'Unassigned',
          joiningDate: employee.joiningDate || new Date().toLocaleDateString('en-IN'),
          status: 'Draft',
        }
        set({ employees: [...get().employees, draft] })
      },
      assignSoilTask: (id, employee, date) =>
        set({
          soilTasks: get().soilTasks.map((task) =>
            task.id === id
              ? { ...task, assignedTo: employee, visitDate: date || task.visitDate, status: 'Scheduled' }
              : task,
          ),
        }),
      cancelSoilTask: (id) =>
        set({ soilTasks: get().soilTasks.filter((task) => task.id !== id) }),
      approveLease: (id) =>
        set({ leases: get().leases.map((lease) => (lease.id === id ? { ...lease, status: 'Approved' } : lease)) }),
      rejectLease: (id) =>
        set({ leases: get().leases.map((lease) => (lease.id === id ? { ...lease, status: 'Rejected' } : lease)) }),
      activateLease: (id) =>
        set({ leases: get().leases.map((lease) => (lease.id === id ? { ...lease, status: 'Active' } : lease)) }),
      verifyLeaseDocuments: (id) =>
        set({ leases: get().leases.map((lease) => (lease.id === id ? { ...lease, documentsVerified: true } : lease)) }),
      updateMarketPrice: (id, price) =>
        set({
          marketPrices: get().marketPrices.map((item) =>
            item.id === id ? { ...item, price, updated: 'Just now' } : item,
          ),
        }),
      publishTemplate: (id) =>
        set({ templates: get().templates.map((item) => (item.id === id ? { ...item, status: 'Published' } : item)) }),
      approveRecommendationRule: (id) =>
        set({
          recommendationRules: get().recommendationRules.map((item) =>
            item.id === id ? { ...item, status: 'Active' } : item,
          ),
        }),
      updateRecommendationWeight: (id, weight) =>
        set({
          recommendationRules: get().recommendationRules.map((item) =>
            item.id === id ? { ...item, weight } : item,
          ),
        }),
      resetDemo: () => set({ ...initialData(), session: get().session }),
    }),
    {
      name: 'kisansangam-admin:v1',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
