import type { ColumnDef } from '@tanstack/react-table'
import { Download, Filter, Plus, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DataTable } from '../components/DataTable'
import { Button, MetricCard, PageHeader, StatusBadge } from '../components/ui'
import { useAdminStore } from '../store/useAdminStore'
import { downloadTextFile } from '../utils/downloads'

type RecordRow = Record<string, unknown>

interface ModuleConfig {
  title: string
  description: string
  rows: RecordRow[]
  keys: string[]
  labels: Record<string, string | undefined>
  metrics: { label: string; value: string; trend?: string; tone?: 'green' | 'amber' | 'red' | 'blue' }[]
  primary?: { label: string; to: string }
  actionLabel?: string
}

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export function ModulePage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const store = useAdminStore()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const config = useMemo<ModuleConfig>(() => {
    switch (pathname) {
      case '/users':
        return {
          title: 'Users & Verification',
          description: 'Manage farmers, land owners, documents and account status',
          rows: store.users as unknown as RecordRow[],
          keys: ['name', 'mobile', 'district', 'subscription', 'profileStatus', 'verification', 'joined'],
          labels: { name: 'User', mobile: 'Mobile', district: 'District', subscription: 'Subscription', profileStatus: 'Profile', verification: 'Verification', joined: 'Joined' },
          metrics: [
            { label: 'Total Farmers', value: '12,450', trend: '+12% vs last month' },
            { label: 'Land Owners', value: '2,180', trend: '+5.2%' },
            { label: 'Verified Users', value: '10,840', trend: '+8.4%' },
            { label: 'Pending', value: '52', trend: '-2.1%', tone: 'amber' },
            { label: 'Rejected', value: '18', trend: '+1.2%', tone: 'red' },
          ],
          actionLabel: 'View',
        }
      case '/subscriptions':
        return {
          title: 'Subscription Management',
          description: 'Manage plans, subscribers, renewals and billing status',
          rows: store.subscriptions as unknown as RecordRow[],
          keys: ['user', 'plan', 'amount', 'started', 'renewal', 'status'],
          labels: { user: 'Subscriber', plan: 'Plan', amount: 'Amount', started: 'Started', renewal: 'Renewal', status: 'Status' },
          metrics: [
            { label: 'Active Subscriptions', value: '1,240', trend: '+18% this month' },
            { label: 'Annual Plans', value: '426', trend: '+34 renewals' },
            { label: 'Monthly Plans', value: '814', trend: '+62 this month' },
            { label: 'Renewal Due', value: '42', trend: 'Next 7 days', tone: 'amber' },
          ],
          actionLabel: 'Manage',
        }
      case '/finance/failed-payments':
        return {
          title: 'Failed Payments',
          description: 'Investigate unsuccessful transactions and retry billing',
          rows: store.payments.filter((payment) => payment.status === 'Failed') as unknown as RecordRow[],
          keys: ['id', 'user', 'amount', 'method', 'date', 'reference', 'status'],
          labels: { id: 'Payment ID', user: 'User', amount: 'Amount', method: 'Method', date: 'Date', reference: 'Reference', status: 'Status' },
          metrics: [
            { label: 'Failed Today', value: '12', trend: '+3 vs yesterday', tone: 'red' },
            { label: 'Value at Risk', value: '₹18,940', tone: 'red' },
            { label: 'Retry Eligible', value: '9', tone: 'amber' },
            { label: 'Recovered', value: '₹42,210', trend: '+18% this month' },
          ],
          actionLabel: 'Retry',
        }
      case '/finance':
        return {
          title: 'Financial Dashboard',
          description: 'Revenue, payments and subscription performance',
          rows: store.payments as unknown as RecordRow[],
          keys: ['id', 'user', 'amount', 'method', 'date', 'reference', 'status'],
          labels: { id: 'Payment ID', user: 'User', amount: 'Amount', method: 'Method', date: 'Date', reference: 'Reference', status: 'Status' },
          metrics: [
            { label: 'Gross Revenue', value: '₹12,24,500', trend: '+15.2%' },
            { label: 'Net Revenue', value: '₹10,81,320', trend: '+13.8%' },
            { label: 'Operating Cost', value: '₹3,42,800', trend: '-2.4%' },
            { label: 'Failed Payments', value: '12', tone: 'red' },
          ],
          primary: { label: 'Cost & Profit', to: '/finance/cost-profit' },
          actionLabel: 'Details',
        }
      case '/employees':
        return {
          title: 'Employee Management',
          description: 'Manage field agents and operations staff',
          rows: store.employees as unknown as RecordRow[],
          keys: ['id', 'name', 'role', 'department', 'district', 'mobile', 'status'],
          labels: { id: 'Employee ID', name: 'Employee', role: 'Role', department: 'Department', district: 'District', mobile: 'Mobile', status: 'Status' },
          metrics: [
            { label: 'Total Employees', value: '184', trend: '+8 this month' },
            { label: 'Field Agents', value: '126' },
            { label: 'Active Assignments', value: '72', trend: '+12 today' },
            { label: 'Draft Profiles', value: String(store.employees.filter((item) => item.status === 'Draft').length), tone: 'amber' },
          ],
          primary: { label: 'Add Employee', to: '/employees/new' },
          actionLabel: 'View',
        }
      case '/soil-testing/pending':
        return {
          title: 'Pending Soil Test Assignments',
          description: 'Assign field agents to unallocated soil testing requests',
          rows: store.soilTasks.filter((task) => task.status === 'Pending') as unknown as RecordRow[],
          keys: ['id', 'farmer', 'district', 'crop', 'assignedTo', 'visitDate', 'status'],
          labels: { id: 'Task ID', farmer: 'Farmer', district: 'District', crop: 'Target Crop', assignedTo: 'Assigned To', visitDate: 'Visit Date', status: 'Status' },
          metrics: [
            { label: 'Pending Assignment', value: '38', tone: 'amber' },
            { label: 'Due Today', value: '9', tone: 'red' },
            { label: 'Agents Available', value: '24' },
            { label: 'Avg. Assignment Time', value: '1.8 hrs', trend: '-12%' },
          ],
          actionLabel: 'Assign',
        }
      case '/soil-testing':
        return {
          title: 'Soil Testing Field Operations',
          description: 'Schedule, assign and track field testing',
          rows: store.soilTasks as unknown as RecordRow[],
          keys: ['id', 'farmer', 'district', 'crop', 'assignedTo', 'visitDate', 'status'],
          labels: { id: 'Task ID', farmer: 'Farmer', district: 'District', crop: 'Crop', assignedTo: 'Assigned To', visitDate: 'Visit Date', status: 'Status' },
          metrics: [
            { label: 'Pending Tests', value: '38', tone: 'amber' },
            { label: 'Scheduled', value: '46' },
            { label: 'In Progress', value: '22', tone: 'blue' },
            { label: 'Completed', value: '864', trend: '+42 this week' },
          ],
          primary: { label: 'Create Soil Test Task', to: '/soil-testing/tasks/new' },
          actionLabel: 'View',
        }
      case '/land-leasing/pending':
        return {
          title: 'Pending Land Listing Approvals',
          description: 'Review ownership documents and listing information',
          rows: store.leases.filter((lease) => lease.status === 'Pending') as unknown as RecordRow[],
          keys: ['id', 'owner', 'district', 'acreage', 'monthlyRent', 'documentsVerified', 'status'],
          labels: { id: 'Listing ID', owner: 'Owner', district: 'District', acreage: 'Acreage', monthlyRent: 'Monthly Rent', documentsVerified: 'Documents', status: 'Status' },
          metrics: [
            { label: 'Pending Approval', value: '28', tone: 'amber' },
            { label: 'Documents Ready', value: '18' },
            { label: 'Needs Re-upload', value: '6', tone: 'red' },
            { label: 'Avg. Review Time', value: '8.4 hrs' },
          ],
          actionLabel: 'Review',
        }
      case '/land-leasing':
        return {
          title: 'Land Leasing Management',
          description: 'Review listings, documents, agreements and active leases',
          rows: store.leases as unknown as RecordRow[],
          keys: ['id', 'owner', 'district', 'acreage', 'monthlyRent', 'documentsVerified', 'status'],
          labels: { id: 'Lease ID', owner: 'Owner', district: 'District', acreage: 'Acres', monthlyRent: 'Monthly Rent', documentsVerified: 'Documents', status: 'Status' },
          metrics: [
            { label: 'Land Listed', value: '2,180', trend: '+6%' },
            { label: 'Active Leases', value: '126', trend: '+8 this month' },
            { label: 'Pending Approvals', value: '28', tone: 'amber' },
            { label: 'Monthly Lease Value', value: '₹18,42,000', trend: '+9.8%' },
          ],
          primary: { label: 'Pending Approvals', to: '/land-leasing/pending' },
          actionLabel: 'View',
        }
      case '/data/crops':
        return {
          title: 'Crop Database Management',
          description: 'Maintain crop profiles, seasons and cultivation parameters',
          rows: store.crops as unknown as RecordRow[],
          keys: ['id', 'name', 'category', 'season', 'duration', 'status'],
          labels: { id: 'Crop ID', name: 'Crop', category: 'Category', season: 'Season', duration: 'Duration', status: 'Status' },
          metrics: [
            { label: 'Total Crops', value: '146', trend: '+4 this month' },
            { label: 'Published', value: '132' },
            { label: 'Drafts', value: '9', tone: 'amber' },
            { label: 'Disabled', value: '5', tone: 'red' },
          ],
          primary: { label: 'Add Crop', to: '/data/crops/new' },
          actionLabel: 'Edit',
        }
      case '/data/soils':
        return {
          title: 'Soil Database Management',
          description: 'Manage soil profiles, district coverage and crop mappings',
          rows: store.soilTypes as unknown as RecordRow[],
          keys: ['id', 'name', 'phRange', 'districts', 'mappedCrops', 'status'],
          labels: { id: 'Soil ID', name: 'Soil Type', phRange: 'pH Range', districts: 'Districts', mappedCrops: 'Mapped Crops', status: 'Status' },
          metrics: [
            { label: 'Soil Types', value: '18' },
            { label: 'District Rules', value: '84' },
            { label: 'Crop Mappings', value: '216', trend: '+12' },
            { label: 'Pending Review', value: '4', tone: 'amber' },
          ],
          primary: { label: 'Add Soil Type', to: '/data/soils/new' },
          actionLabel: 'Edit Rule',
        }
      case '/data/fertilizers':
        return {
          title: 'Fertilizer Guide Management',
          description: 'Control fertilizer dosage rules and crop guidance',
          rows: store.fertilizerRules as unknown as RecordRow[],
          keys: ['id', 'crop', 'soilType', 'fertilizer', 'dosage', 'version', 'status'],
          labels: { id: 'Rule ID', crop: 'Crop', soilType: 'Soil Type', fertilizer: 'Fertilizer', dosage: 'Dosage', version: 'Version', status: 'Status' },
          metrics: [
            { label: 'Published Rules', value: '92' },
            { label: 'Crop Guides', value: '64' },
            { label: 'Pending Review', value: '7', tone: 'amber' },
            { label: 'Coverage', value: '94%', trend: '+2.1%' },
          ],
          primary: { label: 'Add Fertilizer Rule', to: '/data/fertilizers/new' },
          actionLabel: 'Edit',
        }
      case '/data/market-prices':
        return {
          title: 'Market Prices Management',
          description: 'Update APMC prices, inspect history and send farmer alerts',
          rows: store.marketPrices as unknown as RecordRow[],
          keys: ['crop', 'market', 'price', 'unit', 'trend', 'updated'],
          labels: { crop: 'Crop', market: 'Market', price: 'Price', unit: 'Per', trend: 'Trend %', updated: 'Updated' },
          metrics: [
            { label: 'Tracked Markets', value: '34' },
            { label: 'Crop Prices', value: '146' },
            { label: 'Updated Today', value: '128', trend: '88%' },
            { label: 'Alerts Sent', value: '4,820', trend: '+16%' },
          ],
          primary: { label: 'Generate Price Alert', to: '/data/market-prices/alerts/new' },
          actionLabel: 'Edit Price',
        }
      case '/data/weather-alerts':
        return {
          title: 'Weather Alert Rules',
          description: 'Configure thresholds, districts and alert channels',
          rows: store.alertRules as unknown as RecordRow[],
          keys: ['id', 'name', 'event', 'districts', 'channel', 'status'],
          labels: { id: 'Rule ID', name: 'Rule Name', event: 'Trigger', districts: 'Districts', channel: 'Channel', status: 'Status' },
          metrics: [
            { label: 'Active Rules', value: '12' },
            { label: 'Alerts Today', value: '8', tone: 'amber' },
            { label: 'District Coverage', value: '26' },
            { label: 'Delivery Rate', value: '98.6%', trend: '+0.8%' },
          ],
          primary: { label: 'Add Alert Rule', to: '/data/weather-alerts/new' },
          actionLabel: 'Edit',
        }
      case '/data/notifications':
        return {
          title: 'Notification Templates',
          description: 'Manage SMS, WhatsApp, email and in-app messaging',
          rows: store.templates as unknown as RecordRow[],
          keys: ['id', 'name', 'channel', 'language', 'updated', 'status'],
          labels: { id: 'Template ID', name: 'Template', channel: 'Channel', language: 'Language', updated: 'Updated', status: 'Status' },
          metrics: [
            { label: 'Templates', value: '28' },
            { label: 'Published', value: '24' },
            { label: 'Drafts', value: '4', tone: 'amber' },
            { label: 'Messages Sent', value: '18.2K', trend: '+14%' },
          ],
          primary: { label: 'Add Template', to: '/data/notifications/new' },
          actionLabel: 'Edit',
        }
      case '/data/languages':
        return {
          title: 'Language Content Management',
          description: 'Review Gujarati, Hindi and English platform content',
          rows: store.translations as unknown as RecordRow[],
          keys: ['key', 'english', 'gujarati', 'hindi', 'status'],
          labels: { key: 'Content Key', english: 'English', gujarati: 'Gujarati', hindi: 'Hindi', status: 'Status' },
          metrics: [
            { label: 'Content Keys', value: '1,420' },
            { label: 'Gujarati Coverage', value: '96%' },
            { label: 'Hindi Coverage', value: '91%' },
            { label: 'Needs Review', value: '36', tone: 'amber' },
          ],
          primary: { label: 'Add Translation', to: '/data/languages/new' },
          actionLabel: 'Review',
        }
      default:
        return {
          title: 'AI Recommendation Rules',
          description: 'Review models, adjust weights and validate recommendation quality',
          rows: store.recommendationRules as unknown as RecordRow[],
          keys: ['id', 'name', 'model', 'weight', 'precision', 'version', 'status'],
          labels: { id: 'Rule ID', name: 'Rule', model: 'Model', weight: 'Weight', precision: 'Precision %', version: 'Version', status: 'Status' },
          metrics: [
            { label: 'Active Rules', value: '14' },
            { label: 'Average Precision', value: '91.5%', trend: '+2.3%' },
            { label: 'Simulations', value: '48', trend: '+12 this month' },
            { label: 'Needs Review', value: '3', tone: 'amber' },
          ],
          primary: { label: 'Review Rules', to: '/data/ai-rules/review' },
          actionLabel: 'Edit Weights',
        }
    }
  }, [pathname, store])

  const filteredRows = useMemo(
    () =>
      config.rows.filter((row) => {
        const matchesQuery = JSON.stringify(row).toLowerCase().includes(query.toLowerCase())
        const matchesStatus = status === 'All' || String(row.status || row.verification) === status
        return matchesQuery && matchesStatus
      }),
    [config.rows, query, status],
  )

  const actionTarget = useMemo(() => {
    switch (pathname) {
      case '/users': return '/users/KS-USR-1001'
      case '/subscriptions': return '/subscriptions/SUB-2401'
      case '/employees': return '/employees/new'
      case '/soil-testing/pending': return '/soil-testing/tasks/KS-ST-2025-002/assign'
      case '/soil-testing': return '/soil-testing/tasks/KS-ST-2025-001'
      case '/land-leasing':
      case '/land-leasing/pending': return '/land-leasing/KS-LS-1101'
      case '/data/crops': return '/data/crops/CRP-001/edit'
      case '/data/soils': return '/data/soils/SOIL-01/edit'
      case '/data/fertilizers': return '/data/fertilizers/FRT-101/edit'
      case '/data/market-prices': return '/data/market-prices/MKT-001/edit'
      case '/data/weather-alerts': return '/data/weather-alerts/ALT-01/edit'
      case '/data/notifications': return '/data/notifications/TPL-01/edit'
      case '/data/languages': return '/data/languages/TR-03/review'
      case '/data/ai-rules': return '/data/ai-rules/AI-101/weights'
      default: return pathname
    }
  }, [pathname])

  const columns = useMemo<ColumnDef<RecordRow>[]>(
    () => [
      ...config.keys.map((key) => ({
        accessorKey: key,
        header: config.labels[key],
        cell: ({ getValue }: { getValue: () => unknown }) => {
          const value = getValue()
          if (key === 'status' || key === 'verification' || key === 'profileStatus') return <StatusBadge value={String(value)} />
          if (key === 'documentsVerified') return <StatusBadge value={value ? 'Verified' : 'Pending'} />
          if (key === 'amount' || key === 'monthlyRent' || key === 'price') return <span className="font-semibold text-ink">{currency.format(Number(value))}</span>
          if (key === 'trend') return <span className={Number(value) >= 0 ? 'font-semibold text-emerald-600' : 'font-semibold text-red-600'}>{Number(value) > 0 ? '+' : ''}{String(value)}%</span>
          if (Array.isArray(value)) return value.join(', ')
          if (key === 'name' || key === 'user' || key === 'farmer' || key === 'crop' || key === 'owner') return <span className="font-semibold text-slate-800">{String(value)}</span>
          return String(value ?? '—')
        },
      })),
      {
        id: 'actions',
        header: 'Action',
        enableSorting: false,
        cell: () => (
          <Button tone="secondary" className="h-8 px-3 text-xs" onClick={() => navigate(actionTarget)}>
            {config.actionLabel || 'View'}
          </Button>
        ),
      },
    ],
    [actionTarget, config, navigate],
  )

  const exportRows = () => {
    const header = config.keys.map((key) => config.labels[key]).join(',')
    const body = filteredRows.map((row) => config.keys.map((key) => JSON.stringify(row[key] ?? '')).join(',')).join('\n')
    downloadTextFile(`${pathname.split('/').filter(Boolean).join('-') || 'records'}.csv`, `${header}\n${body}`, 'text/csv;charset=utf-8')
  }

  return (
    <div>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <>
            <Button tone="secondary" onClick={exportRows}><Download size={16} />Export</Button>
            {config.primary && <Button onClick={() => navigate(config.primary!.to)}><Plus size={17} />{config.primary.label}</Button>}
          </>
        }
      />
      <section className={`grid gap-3 ${config.metrics.length === 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {config.metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
      </section>
      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <label className="flex h-10 w-[420px] items-center gap-2 rounded-lg border border-line bg-white px-3 text-sm text-muted">
            <Search size={17} />
            <span className="sr-only">Search records</span>
            <input
              className="w-full bg-transparent outline-none"
              placeholder="Search records..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-muted" />
            <select aria-label="Filter by status" className="field h-10 w-40" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option>All</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Failed</option>
              <option>Needs Review</option>
            </select>
            <Button tone="ghost" className="h-10"><Filter size={17} />Filters</Button>
          </div>
        </div>
        <DataTable data={filteredRows} columns={columns} />
      </section>
    </div>
  )
}
