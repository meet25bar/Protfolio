export type ScreenKind = 'auth' | 'dashboard' | 'module' | 'detail' | 'form' | 'confirm' | 'success' | 'report'

export interface ScreenDefinition {
  nodeId: string
  figmaName: string
  path: string
  module: string
  kind: ScreenKind
  title: string
  description?: string
}

const screen = (
  nodeId: string,
  figmaName: string,
  path: string,
  module: string,
  kind: ScreenKind,
  title: string,
  description?: string,
): ScreenDefinition => ({ nodeId, figmaName, path, module, kind, title, description })

/**
 * Route coverage for every functional top-level frame in the KisanSangam
 * Figma file. The final "image" artboard is a source asset, not an app screen.
 */
export const screenManifest: ScreenDefinition[] = [
  screen('1:2', 'admin-login', '/login', 'auth', 'auth', 'Admin Login', 'Sign in to manage KisanSangam operations'),
  screen('1:84', 'Admin Overview Dashboard', '/dashboard', 'dashboard', 'dashboard', 'Admin Dashboard', 'KisanSangam Control Center'),

  screen('1:1467', 'user-verification-management', '/users', 'users', 'module', 'Users & Verification', 'Manage farmers, land owners, documents and account status'),
  screen('6:1659', 'user-full-profile', '/users/KS-USR-1001', 'users', 'detail', 'User Full Profile'),
  screen('6:425', 'documents-pending-verification', '/users/KS-USR-1001/documents', 'users', 'detail', 'Documents Pending Verification'),
  screen('6:2144', 'block-user-confirmation', '/users/KS-USR-1001/block', 'users', 'confirm', 'Block User'),

  screen('1:832', 'subscription-management', '/subscriptions', 'subscriptions', 'module', 'Subscription Management', 'Manage plans, subscribers, renewals and billing status'),
  screen('7:4', 'manage-subscription-detail', '/subscriptions/SUB-2401', 'subscriptions', 'detail', 'Manage Subscription Detail'),

  screen('1:472', 'financial-dashboard', '/finance', 'finance', 'module', 'Financial Dashboard', 'Revenue, payments and subscription performance'),
  screen('1:2753', 'cost-and-profit-dashboard', '/finance/cost-profit', 'finance', 'report', 'Cost & Profit Dashboard'),
  screen('6:840', 'failed-payments', '/finance/failed-payments', 'finance', 'module', 'Failed Payments'),

  screen('1:1163', 'employee-management', '/employees', 'employees', 'module', 'Employee Management', 'Manage field agents and operations staff'),
  screen('9:644', 'add-employee-form', '/employees/new', 'employees', 'form', 'Add New Employee'),
  screen('11:4', 'review-confirm-employee', '/employees/new/review', 'employees', 'detail', 'Review & Confirm Employee'),
  screen('11:364', 'employee-added-success', '/employees/new/success', 'employees', 'success', 'Employee Added Successfully'),

  screen('1:1797', 'Soil Testing Field Operations', '/soil-testing', 'soil-testing', 'module', 'Soil Testing Field Operations', 'Schedule, assign and track field testing'),
  screen('6:6', 'pending-soil-test-assignments', '/soil-testing/pending', 'soil-testing', 'module', 'Pending Soil Test Assignments'),
  screen('39:7', 'create-soil-test-task', '/soil-testing/tasks/new', 'soil-testing', 'form', 'Create Soil Test Task'),
  screen('39:172', 'assign-employee-page', '/soil-testing/tasks/KS-ST-2025-002/assign', 'soil-testing', 'form', 'Assign Employee'),
  screen('39:1169', 'assign-task-page', '/soil-testing/tasks/KS-ST-2025-002/assign-task', 'soil-testing', 'form', 'Assign Task'),
  screen('39:1321', 'view-task-detail', '/soil-testing/tasks/KS-ST-2025-001', 'soil-testing', 'detail', 'Soil Test Task Detail'),
  screen('39:375', 'reassign-visit-page', '/soil-testing/tasks/KS-ST-2025-001/reassign', 'soil-testing', 'form', 'Reassign Visit'),
  screen('39:1055', 'cancel-request-page', '/soil-testing/tasks/KS-ST-2025-001/cancel', 'soil-testing', 'confirm', 'Cancel Soil Test Request'),
  screen('9:4', 'soil-testing-operations-detail', '/soil-testing/reports/KS-ST-2025-001', 'soil-testing', 'report', 'Soil Testing Operations Detail'),
  screen('39:855', 'push-report-page', '/soil-testing/reports/push', 'soil-testing', 'form', 'Push Report to Farmer'),
  screen('47:4', 'pushed-reports-success', '/soil-testing/reports/push/success', 'soil-testing', 'success', 'Reports Pushed Successfully'),

  screen('1:2078', 'land-leasing-management', '/land-leasing', 'land-leasing', 'module', 'Land Leasing Management', 'Review listings, documents, agreements and active leases'),
  screen('6:1202', 'pending-land-listing-approvals', '/land-leasing/pending', 'land-leasing', 'module', 'Pending Land Listing Approvals'),
  screen('41:11', 'view-lease-detail', '/land-leasing/KS-LS-1101', 'land-leasing', 'detail', 'Lease Detail'),
  screen('41:170', 'approve-lease-page', '/land-leasing/KS-LS-1101/approve', 'land-leasing', 'confirm', 'Approve Land Listing'),
  screen('41:287', 'reject-listing-page', '/land-leasing/KS-LS-1101/reject', 'land-leasing', 'confirm', 'Reject Land Listing'),
  screen('41:543', 'view-documents-page', '/land-leasing/KS-LS-1101/documents', 'land-leasing', 'detail', 'Lease Documents'),
  screen('42:285', 'view-verification-documents', '/land-leasing/KS-LS-1101/verification', 'land-leasing', 'detail', 'Verification Documents'),
  screen('41:750', 'mark-lease-active-page', '/land-leasing/KS-LS-1101/activate', 'land-leasing', 'confirm', 'Mark Lease Active'),
  screen('41:896', 'download-agreement-page', '/land-leasing/KS-LS-1101/agreement', 'land-leasing', 'report', 'Digital Lease Agreement'),
  screen('42:14', 'approval-successful', '/land-leasing/KS-LS-1101/approval-success', 'land-leasing', 'success', 'Approval Successful'),
  screen('42:153', 'rejected-successfully', '/land-leasing/KS-LS-1101/rejection-success', 'land-leasing', 'success', 'Listing Rejected Successfully'),

  screen('1:2385', 'data-management-reports', '/data', 'data', 'module', 'Data Management & Reports', 'Maintain platform datasets, content and recommendation logic'),

  screen('1:3374', 'crop-database-management', '/data/crops', 'crops', 'module', 'Crop Database Management'),
  screen('10:11', 'add-new-crop', '/data/crops/new', 'crops', 'form', 'Add New Crop'),
  screen('11:505', 'edit-crop-details', '/data/crops/CRP-001/edit', 'crops', 'form', 'Edit Crop Details'),
  screen('11:867', 'disable-crop-confirmation', '/data/crops/CRP-001/disable', 'crops', 'confirm', 'Disable Crop'),

  screen('1:3636', 'soil-database-management', '/data/soils', 'soils', 'module', 'Soil Database Management'),
  screen('10:209', 'add-new-soil-type', '/data/soils/new', 'soils', 'form', 'Add New Soil Type'),
  screen('21:278', 'desktop-edit-soil-rule', '/data/soils/SOIL-01/edit', 'soils', 'form', 'Edit Soil Rule'),
  screen('21:372', 'desktop-add-crop-mapping', '/data/soils/SOIL-01/crop-mapping', 'soils', 'form', 'Add Crop Mapping'),
  screen('21:466', 'desktop-review-changes', '/data/soils/SOIL-01/review', 'soils', 'detail', 'Review Soil Rule Changes'),
  screen('21:564', 'desktop-save-confirmation', '/data/soils/SOIL-01/success', 'soils', 'success', 'Soil Rule Saved'),

  screen('1:3914', 'fertilizer-guide-management', '/data/fertilizers', 'fertilizers', 'module', 'Fertilizer Guide Management'),
  screen('10:399', 'add-new-fertilizer-rule', '/data/fertilizers/new', 'fertilizers', 'form', 'Add New Fertilizer Rule'),
  screen('27:5', 'desktop-edit-rule', '/data/fertilizers/FRT-101/edit', 'fertilizers', 'form', 'Edit Fertilizer Rule'),
  screen('27:134', 'desktop-crop-guide', '/data/fertilizers/FRT-101/guide', 'fertilizers', 'report', 'Crop Fertilizer Guide'),
  screen('28:6', 'desktop-save-confirmation', '/data/fertilizers/FRT-101/success', 'fertilizers', 'success', 'Fertilizer Rule Saved'),
  screen('28:81', 'desktop-duplicate-rule', '/data/fertilizers/FRT-101/duplicate', 'fertilizers', 'form', 'Duplicate Fertilizer Rule'),
  screen('28:181', 'desktop-disable-rule', '/data/fertilizers/FRT-101/disable', 'fertilizers', 'confirm', 'Disable Fertilizer Rule'),

  screen('1:4220', 'market-prices-management', '/data/market-prices', 'market-prices', 'module', 'Market Prices Management'),
  screen('31:504', 'edit-price', '/data/market-prices/MKT-001/edit', 'market-prices', 'form', 'Edit Market Price'),
  screen('31:661', 'generate-price-alert', '/data/market-prices/alerts/new', 'market-prices', 'form', 'Generate Price Alert'),
  screen('31:878', 'view-history', '/data/market-prices/history', 'market-prices', 'report', 'Market Price History'),
  screen('34:4', 'update-price-success', '/data/market-prices/MKT-001/success', 'market-prices', 'success', 'Price Updated Successfully'),
  screen('34:117', 'send-alert-success', '/data/market-prices/alerts/success', 'market-prices', 'success', 'Price Alert Sent'),

  screen('1:4559', 'weather-alert-rules-management', '/data/weather-alerts', 'weather-alerts', 'module', 'Weather Alert Rules'),
  screen('34:248', 'add-alert-rule', '/data/weather-alerts/new', 'weather-alerts', 'form', 'Add Alert Rule'),
  screen('35:290', 'edit-rule-page', '/data/weather-alerts/ALT-01/edit', 'weather-alerts', 'form', 'Edit Weather Rule'),
  screen('35:421', 'test-alert-page', '/data/weather-alerts/ALT-01/test', 'weather-alerts', 'form', 'Test Alert'),
  screen('35:524', 'message-preview-page', '/data/weather-alerts/ALT-01/preview', 'weather-alerts', 'detail', 'Message Preview'),
  screen('35:617', 'disable-rule-page', '/data/weather-alerts/ALT-01/disable', 'weather-alerts', 'confirm', 'Disable Alert Rule'),

  screen('1:4909', 'notification-templates-management', '/data/notifications', 'notifications', 'module', 'Notification Templates'),
  screen('10:973', 'add-new-notification-template', '/data/notifications/new', 'notifications', 'form', 'Add Notification Template'),
  screen('36:111', 'edit-template', '/data/notifications/TPL-01/edit', 'notifications', 'form', 'Edit Notification Template'),
  screen('36:301', 'preview-message', '/data/notifications/TPL-01/preview', 'notifications', 'detail', 'Preview Notification'),
  screen('36:500', 'send-test', '/data/notifications/TPL-01/send-test', 'notifications', 'form', 'Send Test Notification'),
  screen('36:4', 'save-changes-success', '/data/notifications/TPL-01/success', 'notifications', 'success', 'Template Saved Successfully'),

  screen('1:5177', 'language-content-management', '/data/languages', 'languages', 'module', 'Language Content Management'),
  screen('10:1160', 'add-new-language-content', '/data/languages/new', 'languages', 'form', 'Add Language Content'),
  screen('38:4', 'save-translation-success', '/data/languages/TR-01/success', 'languages', 'success', 'Translation Saved'),
  screen('38:119', 'auto-fill-draft', '/data/languages/TR-03/auto-fill', 'languages', 'form', 'Auto-fill Translation Draft'),
  screen('38:394', 'mark-reviewed', '/data/languages/TR-03/review', 'languages', 'detail', 'Review Translation'),
  screen('38:676', 'request-review', '/data/languages/TR-03/request-review', 'languages', 'form', 'Request Translation Review'),

  screen('1:5426', 'ai-recommendation-rules', '/data/ai-rules', 'ai-rules', 'module', 'AI Recommendation Rules'),
  screen('37:290', 'review-rules-page', '/data/ai-rules/review', 'ai-rules', 'detail', 'Review Recommendation Rules'),
  screen('37:455', 'approve-rule-page', '/data/ai-rules/AI-101/approve', 'ai-rules', 'confirm', 'Approve AI Rule'),
  screen('37:599', 'edit-weights-page', '/data/ai-rules/AI-101/weights', 'ai-rules', 'form', 'Edit Model Weights'),
  screen('37:826', 'run-simulation-page', '/data/ai-rules/AI-101/simulation', 'ai-rules', 'report', 'Run Recommendation Simulation'),
  screen('37:979', 'compare-versions-page', '/data/ai-rules/AI-101/compare', 'ai-rules', 'report', 'Compare Model Versions'),
  screen('37:1235', 'update-rule-page', '/data/ai-rules/AI-101/edit', 'ai-rules', 'form', 'Update Recommendation Rule'),

  // FigJam quick-action nodes are addressable aliases and redirect to their destinations.
  screen('2:110', 'Add Employee', '/quick-actions/add-employee', 'quick-actions', 'detail', 'Add Employee'),
  screen('2:113', 'Assign Soil Test', '/quick-actions/assign-soil-test', 'quick-actions', 'detail', 'Assign Soil Test'),
  screen('2:116', 'Verify Documents', '/quick-actions/verify-documents', 'quick-actions', 'detail', 'Verify Documents'),
  screen('2:119', 'Manage Subscriptions', '/quick-actions/manage-subscriptions', 'quick-actions', 'detail', 'Manage Subscriptions'),
  screen('2:122', 'Export Revenue Report', '/quick-actions/export-revenue', 'quick-actions', 'report', 'Export Revenue Report'),
]

export const screenByPath = new Map(screenManifest.map((item) => [item.path, item]))

export const mainModulePaths = new Set([
  '/users',
  '/subscriptions',
  '/finance',
  '/finance/failed-payments',
  '/employees',
  '/soil-testing',
  '/soil-testing/pending',
  '/land-leasing',
  '/land-leasing/pending',
  '/data',
  '/data/crops',
  '/data/soils',
  '/data/fertilizers',
  '/data/market-prices',
  '/data/weather-alerts',
  '/data/notifications',
  '/data/languages',
  '/data/ai-rules',
])

export const quickActionDestinations: Record<string, string> = {
  '/quick-actions/add-employee': '/employees/new',
  '/quick-actions/assign-soil-test': '/soil-testing/pending',
  '/quick-actions/verify-documents': '/users/KS-USR-1001/documents',
  '/quick-actions/manage-subscriptions': '/subscriptions',
  '/quick-actions/export-revenue': '/finance',
}

export function titleFromFigmaName(value: string) {
  return value
    .replace(/^desktop-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}
