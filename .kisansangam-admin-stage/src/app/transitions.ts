export interface ScreenTransition {
  label: string
  to: string
  tone?: 'primary' | 'secondary' | 'danger'
  action?: 'verify-user' | 'block-user' | 'reject-user' | 'approve-lease' | 'reject-lease' | 'activate-lease' | 'assign-task' | 'update-price' | 'publish-template' | 'approve-ai'
  download?: 'csv' | 'report' | 'agreement'
}

const back = (to: string, label = 'Cancel / Back'): ScreenTransition => ({ label, to, tone: 'secondary' })
const primary = (label: string, to: string, action?: ScreenTransition['action']): ScreenTransition => ({ label, to, tone: 'primary', action })
const danger = (label: string, to: string, action?: ScreenTransition['action']): ScreenTransition => ({ label, to, tone: 'danger', action })

export const transitions: Record<string, ScreenTransition[]> = {
  '/users/KS-USR-1001': [
    primary('Verify Documents', '/users/KS-USR-1001/documents'),
    danger('Block User', '/users/KS-USR-1001/block'),
    back('/users', 'Back to Users'),
  ],
  '/users/KS-USR-1001/documents': [
    primary('Verify Documents', '/users/KS-USR-1001', 'verify-user'),
    danger('Reject Documents', '/users', 'reject-user'),
    back('/users'),
  ],
  '/users/KS-USR-1001/block': [
    danger('Confirm Block User', '/users', 'block-user'),
    back('/users/KS-USR-1001'),
  ],
  '/subscriptions/SUB-2401': [
    primary('View All Payments', '/finance'),
    back('/subscriptions'),
  ],
  '/finance/cost-profit': [
    primary('View Failed Payments', '/finance/failed-payments'),
    { label: 'Download CSV', to: '/finance/cost-profit', tone: 'secondary', download: 'csv' },
    back('/finance'),
  ],
  '/employees/new': [
    primary('Add Employee', '/employees/new/review'),
    back('/employees'),
  ],
  '/employees/new/review': [
    primary('Confirm and Add Employee', '/employees/new/success'),
    back('/employees/new', 'Back to Edit'),
  ],
  '/employees/new/success': [
    primary('Add Another Employee', '/employees/new'),
    back('/employees', 'View Employee Profile'),
  ],
  '/soil-testing/tasks/new': [primary('Create Task', '/soil-testing'), back('/soil-testing')],
  '/soil-testing/tasks/KS-ST-2025-002/assign': [primary('Assign Task', '/soil-testing', 'assign-task'), back('/soil-testing')],
  '/soil-testing/tasks/KS-ST-2025-002/assign-task': [primary('Assign Task', '/soil-testing', 'assign-task'), back('/soil-testing')],
  '/soil-testing/tasks/KS-ST-2025-001': [
    primary('Push Report to Farmer', '/soil-testing/reports/push'),
    primary('Reassign Visit', '/soil-testing/tasks/KS-ST-2025-001/reassign'),
    danger('Cancel Request', '/soil-testing/tasks/KS-ST-2025-001/cancel'),
    back('/soil-testing'),
  ],
  '/soil-testing/tasks/KS-ST-2025-001/reassign': [primary('Confirm Reassignment', '/soil-testing', 'assign-task'), back('/soil-testing')],
  '/soil-testing/tasks/KS-ST-2025-001/cancel': [danger('Confirm Cancellation', '/soil-testing'), back('/soil-testing/tasks/KS-ST-2025-001')],
  '/soil-testing/reports/KS-ST-2025-001': [primary('Push Report', '/soil-testing/reports/push'), back('/soil-testing')],
  '/soil-testing/reports/push': [primary('Push Reports', '/soil-testing/reports/push/success'), back('/soil-testing')],
  '/soil-testing/reports/push/success': [primary('Push More Reports', '/soil-testing/reports/push'), back('/soil-testing', 'Back to Soil Testing')],
  '/land-leasing/KS-LS-1101': [
    primary('Approve Listing', '/land-leasing/KS-LS-1101/approve'),
    danger('Reject Listing', '/land-leasing/KS-LS-1101/reject'),
    primary('View Verification Documents', '/land-leasing/KS-LS-1101/verification'),
    primary('Generate Digital Agreement', '/land-leasing/KS-LS-1101/agreement'),
    back('/land-leasing'),
  ],
  '/land-leasing/KS-LS-1101/approve': [primary('Confirm Approval', '/land-leasing/KS-LS-1101/approval-success', 'approve-lease'), back('/land-leasing/KS-LS-1101')],
  '/land-leasing/KS-LS-1101/reject': [danger('Reject Listing', '/land-leasing/KS-LS-1101/rejection-success', 'reject-lease'), back('/land-leasing/KS-LS-1101')],
  '/land-leasing/KS-LS-1101/documents': [primary('Approve Verification', '/land-leasing/KS-LS-1101'), back('/land-leasing/KS-LS-1101')],
  '/land-leasing/KS-LS-1101/verification': [primary('Mark All as Verified', '/land-leasing/KS-LS-1101'), danger('Request Re-upload', '/land-leasing/KS-LS-1101'), back('/land-leasing/KS-LS-1101')],
  '/land-leasing/KS-LS-1101/activate': [primary('Activate Lease', '/land-leasing/KS-LS-1101', 'activate-lease'), back('/land-leasing/KS-LS-1101')],
  '/land-leasing/KS-LS-1101/agreement': [
    { label: 'Download Agreement', to: '/land-leasing/KS-LS-1101/agreement', tone: 'primary', download: 'agreement' },
    { label: 'Request E-Signatures', to: '/land-leasing/KS-LS-1101/agreement', tone: 'secondary' },
    back('/land-leasing/KS-LS-1101'),
  ],
  '/land-leasing/KS-LS-1101/approval-success': [primary('View Lease Details', '/land-leasing/KS-LS-1101'), back('/land-leasing', 'Back to Land Leasing')],
  '/land-leasing/KS-LS-1101/rejection-success': [primary('View All Pending Reviews', '/land-leasing/pending'), back('/land-leasing', 'Back to Land Leasing')],
  '/data/crops/new': [primary('Save and Publish', '/data/crops'), back('/data/crops')],
  '/data/crops/CRP-001/edit': [primary('Save Changes', '/data/crops'), back('/data/crops')],
  '/data/crops/CRP-001/disable': [danger('Confirm Disable Crop', '/data/crops'), back('/data/crops', 'Cancel and Return')],
  '/data/soils/new': [primary('Save and Publish', '/data/soils'), back('/data/soils')],
  '/data/soils/SOIL-01/edit': [primary('Save Rule', '/data/soils/SOIL-01/review'), back('/data/soils')],
  '/data/soils/SOIL-01/crop-mapping': [primary('Add Selected Crops', '/data/soils/SOIL-01/review'), back('/data/soils')],
  '/data/soils/SOIL-01/review': [primary('Submit for Approval', '/data/soils/SOIL-01/success'), back('/data/soils/SOIL-01/edit', 'Back to Edit')],
  '/data/soils/SOIL-01/success': [primary('View Rule Detail', '/data/soils/SOIL-01/edit'), back('/data/soils', 'Back to Dashboard')],
  '/data/fertilizers/new': [primary('Save and Publish', '/data/fertilizers'), back('/data/fertilizers')],
  '/data/fertilizers/FRT-101/edit': [
    primary('Save Changes', '/data/fertilizers/FRT-101/success'),
    primary('View Guide', '/data/fertilizers/FRT-101/guide'),
    back('/data/fertilizers'),
  ],
  '/data/fertilizers/FRT-101/guide': [back('/data/fertilizers')],
  '/data/fertilizers/FRT-101/success': [back('/data/fertilizers', 'Back to Rules')],
  '/data/fertilizers/FRT-101/duplicate': [primary('Create Duplicate', '/data/fertilizers'), back('/data/fertilizers')],
  '/data/fertilizers/FRT-101/disable': [danger('Disable Rule', '/data/fertilizers'), back('/data/fertilizers')],
  '/data/market-prices/MKT-001/edit': [primary('Update Price', '/data/market-prices/MKT-001/success', 'update-price'), back('/data/market-prices')],
  '/data/market-prices/alerts/new': [primary('Send Alert', '/data/market-prices/alerts/success'), back('/data/market-prices')],
  '/data/market-prices/history': [
    { label: 'Download CSV', to: '/data/market-prices/history', tone: 'primary', download: 'csv' },
    { label: 'Generate Report', to: '/data/market-prices/history', tone: 'secondary', download: 'report' },
    back('/data/market-prices'),
  ],
  '/data/market-prices/MKT-001/success': [primary('View Price History', '/data/market-prices/history'), back('/data/market-prices', 'Back to Market Prices')],
  '/data/market-prices/alerts/success': [primary('View Alert History', '/data/market-prices/history'), back('/data/market-prices', 'Back to Market Prices')],
  '/data/weather-alerts/new': [primary('Create Rule', '/data/weather-alerts'), primary('Preview', '/data/weather-alerts/ALT-01/preview'), back('/data/weather-alerts')],
  '/data/weather-alerts/ALT-01/edit': [primary('Save Changes', '/data/weather-alerts'), back('/data/weather-alerts')],
  '/data/weather-alerts/ALT-01/test': [primary('Send Test Alert', '/data/weather-alerts'), back('/data/weather-alerts', 'Close')],
  '/data/weather-alerts/ALT-01/preview': [back('/data/weather-alerts', 'Close Preview')],
  '/data/weather-alerts/ALT-01/disable': [danger('Disable Rule', '/data/weather-alerts'), back('/data/weather-alerts')],
  '/data/notifications/new': [primary('Save and Publish', '/data/notifications'), back('/data/notifications')],
  '/data/notifications/TPL-01/edit': [primary('Save Changes', '/data/notifications/TPL-01/success', 'publish-template'), back('/data/notifications')],
  '/data/notifications/TPL-01/preview': [primary('Send Test', '/data/notifications/TPL-01/send-test'), back('/data/notifications')],
  '/data/notifications/TPL-01/send-test': [primary('Send Test Now', '/data/notifications'), back('/data/notifications')],
  '/data/notifications/TPL-01/success': [back('/data/notifications', 'Back to Templates')],
  '/data/languages/new': [primary('Save Entry', '/data/languages'), back('/data/languages')],
  '/data/languages/TR-01/success': [back('/data/languages', 'Back to Localization')],
  '/data/languages/TR-03/auto-fill': [primary('Apply Draft', '/data/languages'), primary('Review', '/data/languages/TR-03/review'), back('/data/languages', 'Discard')],
  '/data/languages/TR-03/review': [primary('Mark Reviewed and Approved', '/data/languages'), danger('Request Changes', '/data/languages/TR-03/request-review')],
  '/data/languages/TR-03/request-review': [primary('Submit Request', '/data/languages'), back('/data/languages')],
  '/data/ai-rules/review': [primary('Approve All Selected', '/data/ai-rules/AI-101/approve'), back('/data/ai-rules')],
  '/data/ai-rules/AI-101/approve': [primary('Confirm Approval', '/data/ai-rules', 'approve-ai'), back('/data/ai-rules')],
  '/data/ai-rules/AI-101/weights': [primary('Save Weights', '/data/ai-rules'), back('/data/ai-rules')],
  '/data/ai-rules/AI-101/simulation': [primary('Save Results', '/data/ai-rules'), back('/data/ai-rules')],
  '/data/ai-rules/AI-101/compare': [back('/data/ai-rules', 'Close')],
  '/data/ai-rules/AI-101/edit': [primary('Update Rule', '/data/ai-rules'), back('/data/ai-rules')],
}
