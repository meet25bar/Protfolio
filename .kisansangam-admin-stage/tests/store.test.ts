import { beforeEach, describe, expect, it } from 'vitest'
import { useAdminStore } from '../src/store/useAdminStore'

describe('admin mock store', () => {
  beforeEach(() => {
    localStorage.clear()
    useAdminStore.setState({ session: null })
    useAdminStore.getState().resetDemo()
  })

  it('persists a selected admin session', () => {
    useAdminStore.getState().login('admin@kisansangam.com', 'Super Admin', true)
    expect(useAdminStore.getState().session).toEqual({
      email: 'admin@kisansangam.com',
      role: 'Super Admin',
      remember: true,
    })
    expect(localStorage.getItem('kisansangam-admin:v1')).toContain('admin@kisansangam.com')
  })

  it('updates user verification and block states', () => {
    useAdminStore.getState().verifyUser('KS-USR-1002')
    expect(useAdminStore.getState().users.find((user) => user.id === 'KS-USR-1002')?.verification).toBe('Verified')
    useAdminStore.getState().blockUser('KS-USR-1002')
    expect(useAdminStore.getState().users.find((user) => user.id === 'KS-USR-1002')?.verification).toBe('Blocked')
  })

  it('assigns soil tasks and updates operational records', () => {
    useAdminStore.getState().assignSoilTask('KS-ST-2025-002', 'Rajesh Sharma', '18 Jan 2026')
    const task = useAdminStore.getState().soilTasks.find((item) => item.id === 'KS-ST-2025-002')
    expect(task).toMatchObject({ assignedTo: 'Rajesh Sharma', visitDate: '18 Jan 2026', status: 'Scheduled' })

    useAdminStore.getState().approveLease('KS-LS-1101')
    expect(useAdminStore.getState().leases.find((lease) => lease.id === 'KS-LS-1101')?.status).toBe('Approved')

    useAdminStore.getState().updateMarketPrice('MKT-001', 2525)
    expect(useAdminStore.getState().marketPrices.find((price) => price.id === 'MKT-001')?.price).toBe(2525)
  })
})
