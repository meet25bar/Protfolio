import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  FlaskConical,
  LandPlot,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Sprout,
  UploadCloud,
  UserRound,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import type { ScreenDefinition } from '../app/screenManifest'
import { transitions, type ScreenTransition } from '../app/transitions'
import { useToast } from '../components/ToastProvider'
import { Button, Card, PageHeader, StatusBadge } from '../components/ui'
import { useAdminStore } from '../store/useAdminStore'
import type { Employee } from '../types'
import { downloadTextFile } from '../utils/downloads'

const genericFormSchema = z.object({
  name: z.string().min(2, 'This field is required'),
  category: z.string().min(1, 'Select an option'),
  region: z.string().min(1, 'Select a district or region'),
  description: z.string().min(8, 'Add at least eight characters'),
  effectiveDate: z.string().min(1, 'Select a date'),
})

type GenericFormValues = z.infer<typeof genericFormSchema>

const moduleHome: Record<string, string> = {
  users: '/users',
  subscriptions: '/subscriptions',
  finance: '/finance',
  employees: '/employees',
  'soil-testing': '/soil-testing',
  'land-leasing': '/land-leasing',
  crops: '/data/crops',
  soils: '/data/soils',
  fertilizers: '/data/fertilizers',
  'market-prices': '/data/market-prices',
  'weather-alerts': '/data/weather-alerts',
  notifications: '/data/notifications',
  languages: '/data/languages',
  'ai-rules': '/data/ai-rules',
}

const moduleIcon: Record<string, typeof Sprout> = {
  users: UserRound,
  subscriptions: FileCheck2,
  finance: FileText,
  employees: UserRound,
  'soil-testing': FlaskConical,
  'land-leasing': LandPlot,
  crops: Sprout,
  soils: MapPin,
  fertilizers: FlaskConical,
  'market-prices': FileText,
  'weather-alerts': MessageSquareText,
  notifications: Mail,
  languages: MessageSquareText,
  'ai-rules': Bot,
}

function detailPairs(screen: ScreenDefinition): [string, string][] {
  const pairs: Record<string, [string, string][]> = {
    users: [
      ['User ID', 'KS-USR-1001'],
      ['Name', 'Vivek Patel'],
      ['Contact', '+91 98765 43210'],
      ['District', 'Anand, Gujarat'],
      ['Land Size', '2.5 Acres'],
      ['Target Crop', 'Wheat'],
    ],
    subscriptions: [
      ['Subscription ID', 'SUB-2401'],
      ['Subscriber', 'Vivek Patel'],
      ['Plan', 'Premium Annual'],
      ['Amount', '₹2,499'],
      ['Renewal', '12 Jan 2027'],
      ['Status', 'Active'],
    ],
    'soil-testing': [
      ['Task ID', 'KS-ST-2025-001'],
      ['Farmer', 'Vivek Patel'],
      ['District', 'Anand'],
      ['Assigned Agent', 'Rajesh Sharma'],
      ['Target Crop', 'Wheat'],
      ['Visit Date', '16 Jan 2026'],
    ],
    'land-leasing': [
      ['Lease ID', 'KS-LS-1101'],
      ['Land Owner', 'Priya Shah'],
      ['Location', 'Vadodara, Gujarat'],
      ['Land Size', '10 Acres'],
      ['Monthly Rent', '₹45,000'],
      ['Document Status', 'Verified'],
    ],
    fertilizers: [
      ['Rule ID', 'FRT-101'],
      ['Crop', 'Wheat'],
      ['Soil Type', 'Black Soil'],
      ['Fertilizer', 'Urea + SSP'],
      ['Dosage', '110 + 75 kg/acre'],
      ['Version', 'v2.1'],
    ],
    notifications: [
      ['Template ID', 'TPL-01'],
      ['Template', 'Soil Report Ready'],
      ['Channel', 'WhatsApp'],
      ['Language', 'Gujarati'],
      ['Last Updated', '12 Jan 2026'],
      ['Status', 'Published'],
    ],
    languages: [
      ['Content Key', 'soil.report_ready'],
      ['English', 'Your soil report is ready'],
      ['Gujarati', 'તમારો જમીન અહેવાલ તૈયાર છે'],
      ['Hindi', 'आपकी मिट्टी रिपोर्ट तैयार है'],
      ['Reviewer', 'Content Team'],
      ['Status', 'Needs Review'],
    ],
    'ai-rules': [
      ['Rule ID', 'AI-101'],
      ['Rule', 'Crop Suitability Score'],
      ['Model', 'CropMatch v4'],
      ['Weight', '0.34'],
      ['Precision', '94.2%'],
      ['Version', '4.2.1'],
    ],
  }
  return pairs[screen.module] || [
    ['Record ID', screen.nodeId.replace(':', '-')],
    ['Module', screen.module.replace(/-/g, ' ')],
    ['Owner', 'KisanSangam Operations'],
    ['Last Updated', 'Today, 10:30'],
    ['Review Cycle', 'Monthly'],
    ['Status', 'Active'],
  ]
}

export function WorkflowPage({ screen }: { screen: ScreenDefinition }) {
  const navigate = useNavigate()
  const notify = useToast().notify
  const store = useAdminStore()
  const [uploadName, setUploadName] = useState('')
  const Icon = moduleIcon[screen.module] || FileText
  const actions = transitions[screen.path] || [{ label: `Back to ${screen.module.replace(/-/g, ' ')}`, to: moduleHome[screen.module] || '/dashboard', tone: 'secondary' as const }]
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenericFormValues>({
    resolver: zodResolver(genericFormSchema),
    defaultValues: {
      name: screen.title.replace(/^(Add|Edit|Update|Create|Generate|Request|Assign|Run|Review)\s+/i, ''),
      category: 'Standard',
      region: 'Anand',
      description: `Configured through the ${screen.title} workflow for KisanSangam operations.`,
      effectiveDate: '2026-01-15',
    },
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [screen.path])

  const employeeDraft = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('kisansangam:employee-draft') || '{}') as Record<string, unknown>
    } catch {
      return {}
    }
  }, [])

  const mutate = (transition: ScreenTransition) => {
    switch (transition.action) {
      case 'verify-user': store.verifyUser('KS-USR-1001'); notify('User documents verified'); break
      case 'reject-user': store.rejectUser('KS-USR-1001'); notify('Documents rejected'); break
      case 'block-user': store.blockUser('KS-USR-1001'); notify('User blocked'); break
      case 'approve-lease': store.approveLease('KS-LS-1101'); notify('Land listing approved'); break
      case 'reject-lease': store.rejectLease('KS-LS-1101'); notify('Land listing rejected'); break
      case 'activate-lease': store.activateLease('KS-LS-1101'); notify('Lease marked active'); break
      case 'assign-task': store.assignSoilTask('KS-ST-2025-002', 'Rajesh Sharma', '18 Jan 2026'); notify('Soil test assigned'); break
      case 'update-price': store.updateMarketPrice('MKT-001', 2525); notify('Market price updated'); break
      case 'publish-template': store.publishTemplate('TPL-01'); notify('Template published'); break
      case 'approve-ai': store.approveRecommendationRule('AI-101'); notify('Recommendation rule approved'); break
    }
  }

  const runTransition = (transition: ScreenTransition) => {
    if (transition.download) {
      const name = transition.download === 'agreement' ? 'KS-LS-1101-agreement.doc' : `kisansangam-${transition.download}.csv`
      const content = transition.download === 'agreement'
        ? 'KisanSangam Digital Land Lease Agreement\nLease: KS-LS-1101\nOwner: Priya Shah\nStatus: Ready for signatures'
        : 'id,name,status\n1,KisanSangam Sample,Completed'
      downloadTextFile(name, content, transition.download === 'agreement' ? 'application/msword' : 'text/csv')
      notify(`${transition.label} downloaded`)
      return
    }

    if (screen.path === '/employees/new/review' && transition.to.endsWith('/success')) {
      const draft = employeeDraft
      const employee: Omit<Employee, 'id'> = {
        name: `${String(draft.firstName || 'New')} ${String(draft.lastName || 'Employee')}`,
        role: String(draft.role || 'Field Agent'),
        department: String(draft.department || 'Soil Testing'),
        mobile: String(draft.phone || '+91 98765 00000'),
        district: String(draft.district || 'Anand'),
        joiningDate: String(draft.joiningDate || '15 Jan 2026'),
        status: 'Active',
      }
      store.addEmployee(employee)
      sessionStorage.removeItem('kisansangam:employee-draft')
      notify('Employee added successfully')
    }

    mutate(transition)
    navigate(transition.to)
  }

  const ActionButtons = ({ validate = false }: { validate?: boolean }) => (
    <div className="flex flex-wrap justify-end gap-3">
      {actions.map((transition) => (
        <Button
          key={`${transition.label}-${transition.to}`}
          type="button"
          tone={transition.tone || 'primary'}
          onClick={validate && transition.tone === 'primary' ? handleSubmit(() => runTransition(transition)) : () => runTransition(transition)}
        >
          {transition.download && <Download size={16} />}
          {transition.label}
        </Button>
      ))}
    </div>
  )

  if (screen.kind === 'success') {
    return (
      <div className="mx-auto max-w-4xl pt-16">
        <Card className="overflow-hidden text-center">
          <div className="bg-brand-50 px-10 py-14">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={42} />
            </span>
            <h1 className="mt-6 text-3xl font-bold text-ink">{screen.title}</h1>
            <p className="mx-auto mt-2 max-w-xl text-muted">
              The operation completed successfully and the local demonstration data has been updated.
            </p>
          </div>
          <div className="p-8">
            <div className="mx-auto mb-8 grid max-w-2xl grid-cols-3 gap-3 text-left">
              {detailPairs(screen).slice(0, 3).map(([label, value]) => (
                <div key={label} className="rounded-lg bg-workspace p-4">
                  <p className="eyebrow">{label}</p>
                  <p className="mt-1 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <ActionButtons />
          </div>
        </Card>
      </div>
    )
  }

  if (screen.kind === 'confirm') {
    return (
      <>
        <div aria-hidden="true" className="opacity-40">
          <PageHeader title={screen.title} description="Review the operation before confirming" />
          <Card className="h-[520px]" />
        </div>
        <div className="fixed inset-0 left-60 z-50 flex items-center justify-center bg-slate-950/45 p-10">
          <div role="dialog" aria-modal="true" aria-labelledby="confirmation-title" className="w-[520px] rounded-2xl bg-white p-8 shadow-dialog">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <AlertTriangle size={29} />
            </span>
            <h1 id="confirmation-title" className="mt-5 text-2xl font-bold">{screen.title}</h1>
            <p className="mt-2 leading-6 text-muted">
              This action changes the current workflow status. Review the record information before confirming.
            </p>
            <div className="my-6 rounded-xl border border-line bg-workspace p-4">
              {detailPairs(screen).slice(0, 3).map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-line py-2 text-sm last:border-0">
                  <span className="text-muted">{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
            <ActionButtons />
          </div>
        </div>
      </>
    )
  }

  if (screen.kind === 'form') {
    return (
      <div>
        <button className="mb-4 flex items-center gap-2 text-sm text-muted hover:text-brand-700" onClick={() => navigate(moduleHome[screen.module] || '/dashboard')}>
          <ArrowLeft size={17} /> Back
        </button>
        <PageHeader title={screen.title} description="Complete the required details and review before saving" />
        <form className="grid grid-cols-[1.35fr_.65fr] items-start gap-6" onSubmit={(event) => event.preventDefault()}>
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold"><Icon size={20} className="text-brand-700" />Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <label className="col-span-2"><span className="field-label">Name / Title *</span><input className="field" {...register('name')} />{errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}</label>
                <label><span className="field-label">Category *</span><select className="field" {...register('category')}><option>Standard</option><option>Premium</option><option>Operational</option><option>Advisory</option></select></label>
                <label><span className="field-label">District / Region *</span><select className="field" {...register('region')}><option>Anand</option><option>Vadodara</option><option>Rajkot</option><option>All Gujarat</option></select></label>
                <label className="col-span-2"><span className="field-label">Description *</span><textarea className="field h-28 py-3" {...register('description')} />{errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}</label>
                <label><span className="field-label">Effective Date *</span><input className="field" type="date" {...register('effectiveDate')} /></label>
                <label><span className="field-label">Status</span><select className="field"><option>Draft</option><option>Published</option><option>Active</option></select></label>
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold"><UploadCloud size={20} className="text-brand-700" />Supporting Document</h2>
              <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line bg-workspace text-sm text-muted hover:border-brand-700">
                <UploadCloud className="mb-2 text-brand-700" />
                {uploadName || 'Click to upload or drag & drop'}
                <span className="mt-1 text-xs">PDF, DOCX, JPG or PNG up to 5MB</span>
                <input type="file" className="hidden" onChange={(event) => setUploadName(event.target.files?.[0]?.name || '')} />
              </label>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="section-title">Publishing Checklist</h2>
              <div className="mt-4 space-y-3">
                {['Required fields completed', 'District coverage selected', 'Content reviewed', 'Effective date confirmed'].map((item) => (
                  <label key={item} className="flex items-center gap-3 text-sm">
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-700" />
                    {item}
                  </label>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <p className="eyebrow">Figma screen</p>
              <p className="mt-1 font-semibold">{screen.figmaName}</p>
              <p className="mt-3 text-sm text-muted">Node {screen.nodeId}. Changes are stored locally for this interactive demonstration.</p>
            </Card>
          </div>
          <div className="col-span-2 flex items-center justify-between rounded-xl border border-line bg-white p-4">
            <p className="text-sm text-muted">All required fields are marked with an asterisk.</p>
            <ActionButtons validate />
          </div>
        </form>
      </div>
    )
  }

  const isReport = screen.kind === 'report'
  return (
    <div>
      <button className="mb-4 flex items-center gap-2 text-sm text-muted hover:text-brand-700" onClick={() => navigate(moduleHome[screen.module] || '/dashboard')}>
        <ArrowLeft size={17} /> Back
      </button>
      <PageHeader title={screen.title} description={isReport ? 'Operational report and delivery preview' : 'Review record information and available actions'} />
      <div className="grid grid-cols-[1.25fr_.75fr] items-start gap-6">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 border-b border-line pb-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon size={24} /></span>
              <div>
                <p className="eyebrow">{screen.module.replace(/-/g, ' ')}</p>
                <h2 className="text-xl font-bold">{screen.title}</h2>
              </div>
              <span className="ml-auto"><StatusBadge value={screen.kind === 'report' ? 'Completed' : 'Active'} /></span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5">
              {detailPairs(screen).map(([label, value]) => (
                <div key={label}>
                  <dt className="eyebrow">{label}</dt>
                  <dd className="mt-1 font-semibold text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
          {isReport && (
            <Card className="p-6">
              <h2 className="section-title">Report Summary</h2>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ['Soil pH Level', '6.2', 'Normal'],
                  ['Available Nitrogen', '140 kg/ha', 'Low'],
                  ['Phosphorus', '22 kg/ha', 'Optimal'],
                ].map(([label, value, status]) => (
                  <div key={label} className="rounded-xl bg-workspace p-4">
                    <p className="eyebrow">{label}</p>
                    <p className="mt-2 text-xl font-bold">{value}</p>
                    <p className="mt-1 text-xs font-semibold text-brand-700">{status}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border-l-4 border-brand-700 bg-brand-50 p-4">
                <p className="eyebrow">Recommended Action</p>
                <p className="mt-1 text-sm leading-6">Apply Urea at 110 kg/acre and Single Super Phosphate at 75 kg/acre to support optimal crop growth.</p>
              </div>
            </Card>
          )}
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="section-title">Activity Timeline</h2>
            <ol className="mt-5 space-y-5">
              {['Record created by Admin Operator', 'Documents and fields reviewed', 'Latest status applied'].map((item, index) => (
                <li key={item} className="relative flex gap-3 text-sm before:absolute before:left-[7px] before:top-5 before:h-8 before:w-px before:bg-line last:before:hidden">
                  <span className={`mt-1 h-4 w-4 rounded-full border-4 ${index === 2 ? 'border-brand-700 bg-white' : 'border-emerald-200 bg-brand-700'}`} />
                  <div><p className="font-semibold">{item}</p><p className="mt-0.5 text-xs text-muted">{index + 1} day{index ? 's' : ''} ago</p></div>
                </li>
              ))}
            </ol>
          </Card>
          <Card className="p-6">
            <h2 className="section-title">Available Actions</h2>
            <div className="mt-4"><ActionButtons /></div>
          </Card>
          <Card className="flex items-center gap-3 p-5 text-sm text-muted">
            <Phone size={18} className="text-brand-700" />
            Need assistance? Contact the KisanSangam operations team.
          </Card>
        </div>
      </div>
    </div>
  )
}
