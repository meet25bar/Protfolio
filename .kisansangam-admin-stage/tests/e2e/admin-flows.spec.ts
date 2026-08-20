import { expect, test, type Page } from '@playwright/test'

async function login(page: Page) {
  await page.goto('/login')
  await page.getByRole('button', { name: 'Login to Dashboard' }).click()
  await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible()
}

test.describe('KisanSangam admin workflows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.evaluate(() => localStorage.clear())
    await login(page)
  })

  test('all primary modules are addressable', async ({ page }) => {
    const routes = [
      ['/users', 'Users & Verification'],
      ['/subscriptions', 'Subscription Management'],
      ['/finance', 'Financial Dashboard'],
      ['/employees', 'Employee Management'],
      ['/soil-testing', 'Soil Testing Field Operations'],
      ['/land-leasing', 'Land Leasing Management'],
      ['/data', 'Data Management & Reports'],
      ['/data/crops', 'Crop Database Management'],
      ['/data/soils', 'Soil Database Management'],
      ['/data/fertilizers', 'Fertilizer Guide Management'],
      ['/data/market-prices', 'Market Prices Management'],
      ['/data/weather-alerts', 'Weather Alert Rules'],
      ['/data/notifications', 'Notification Templates'],
      ['/data/languages', 'Language Content Management'],
      ['/data/ai-rules', 'AI Recommendation Rules'],
    ] as const
    for (const [route, heading] of routes) {
      await page.goto(route)
      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
    }
  })

  test('verifies and blocks a user through route-backed dialogs', async ({ page }) => {
    await page.goto('/users/KS-USR-1001/documents')
    await page.getByRole('button', { name: 'Verify Documents' }).click()
    await expect(page.getByRole('heading', { name: 'User Full Profile', level: 1 })).toBeVisible()
    await page.getByRole('button', { name: 'Block User' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.getByRole('button', { name: 'Confirm Block User' }).click()
    await expect(page.getByRole('heading', { name: 'Users & Verification' })).toBeVisible()
  })

  test('assigns a soil test and pushes a report', async ({ page }) => {
    await page.goto('/soil-testing/tasks/KS-ST-2025-002/assign')
    await page.getByRole('button', { name: 'Assign Task' }).click()
    await expect(page.getByRole('heading', { name: 'Soil Testing Field Operations' })).toBeVisible()
    await page.goto('/soil-testing/reports/push')
    await page.getByRole('button', { name: 'Push Reports' }).click()
    await expect(page.getByRole('heading', { name: 'Reports Pushed Successfully' })).toBeVisible()
  })

  test('approves and rejects land listings', async ({ page }) => {
    await page.goto('/land-leasing/KS-LS-1101/approve')
    await page.getByRole('button', { name: 'Confirm Approval' }).click()
    await expect(page.getByRole('heading', { name: 'Approval Successful' })).toBeVisible()
    await page.goto('/land-leasing/KS-LS-1101/reject')
    await page.getByRole('button', { name: 'Reject Listing' }).click()
    await expect(page.getByRole('heading', { name: 'Listing Rejected Successfully' })).toBeVisible()
  })

  test('runs data-management transitions', async ({ page }) => {
    const journeys = [
      ['/data/crops/CRP-001/disable', 'Confirm Disable Crop', '/data/crops'],
      ['/data/market-prices/MKT-001/edit', 'Update Price', '/data/market-prices/MKT-001/success'],
      ['/data/notifications/TPL-01/edit', 'Save Changes', '/data/notifications/TPL-01/success'],
      ['/data/ai-rules/AI-101/approve', 'Confirm Approval', '/data/ai-rules'],
    ] as const
    for (const [start, action, expected] of journeys) {
      await page.goto(start)
      await page.getByRole('button', { name: action }).click()
      await expect(page).toHaveURL(new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    }
  })
})
