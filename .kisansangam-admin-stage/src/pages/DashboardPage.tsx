import {
  BadgeIndianRupee,
  CalendarCheck,
  Download,
  FileCheck2,
  FlaskConical,
  MapPin,
  ShieldCheck,
  UserPlus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button, Card, MetricCard, PageHeader } from '../components/ui'
import { downloadTextFile } from '../utils/downloads'

const revenue = [
  { month: 'Jan', value: 56 },
  { month: 'Feb', value: 68 },
  { month: 'Mar', value: 80 },
  { month: 'Apr', value: 98 },
  { month: 'May', value: 111 },
  { month: 'Jun', value: 127 },
]

const activity = [
  { name: 'New Farmers', value: 92, fill: '#1b5e20' },
  { name: 'Soil Tests', value: 75, fill: '#795548' },
  { name: 'Subs', value: 46, fill: '#009688' },
  { name: 'Land', value: 64, fill: '#ff9800' },
  { name: 'AI Rec', value: 104, fill: '#2e7d32' },
]

const urgent = [
  { icon: FlaskConical, label: '38 soil tests pending assignment', to: '/soil-testing/pending', tone: 'amber' },
  { icon: FileCheck2, label: '52 documents need verification', to: '/users/KS-USR-1001/documents', tone: 'amber' },
  { icon: BadgeIndianRupee, label: '12 failed payments', to: '/finance/failed-payments', tone: 'red' },
  { icon: MapPin, label: '28 land listings pending approval', to: '/land-leasing/pending', tone: 'amber' },
]

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Live platform overview and high-priority operations"
        actions={
          <>
            <select aria-label="Report period" className="field h-10 w-36">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
            </select>
            <Button
              tone="secondary"
              onClick={() => downloadTextFile('kisansangam-dashboard-report.csv', 'metric,value\nTotal Farmers,12450\nMonthly Revenue,122500')}
            >
              <Download size={16} />
              Export Report
            </Button>
          </>
        }
      />
      <section aria-label="Platform metrics" className="grid grid-cols-4 gap-3">
        <MetricCard label="Total Farmers" value="12,450" trend="+12% this month" />
        <MetricCard label="Land Listed" value="2,180" trend="+6% this month" />
        <MetricCard label="Premium Users" value="1,240" trend="+18% this month" />
        <MetricCard label="Monthly Revenue" value="₹1,22,500" trend="+15% this month" />
        <MetricCard label="Pending Soil Tests" value="38" trend="Needs assignment" tone="amber" />
        <MetricCard label="Completed Soil Tests" value="864" trend="+42 this week" />
        <MetricCard label="Active Land Leases" value="126" trend="+8 this month" />
        <MetricCard label="Pending Verifications" value="52" trend="Review required" tone="red" />
      </section>

      <section className="mt-5 grid grid-cols-2 gap-5">
        <Card className="h-[340px] p-6">
          <h2 className="section-title">Revenue Trend</h2>
          <div className="mt-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <CartesianGrid vertical={false} stroke="#e0e5df" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8d928b', fontSize: 12 }} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1b5e20" strokeWidth={3} dot={{ fill: '#1b5e20', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="h-[340px] p-6">
          <h2 className="section-title">Platform Activity</h2>
          <div className="mt-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activity}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8d928b', fontSize: 11 }} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="mt-5">
        <h2 className="section-title mb-3">Urgent Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {urgent.map(({ icon: Icon, label, to, tone }) => (
            <button
              key={label}
              onClick={() => navigate(to)}
              className={`card flex min-h-20 items-center gap-3 border-l-4 p-4 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-md ${
                tone === 'red' ? 'border-l-red-500' : 'border-l-amber-500'
              }`}
            >
              <Icon size={21} className={tone === 'red' ? 'text-red-500' : 'text-amber-500'} />
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="section-title mb-3">Quick Admin Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button tone="secondary" onClick={() => navigate('/employees/new')}><UserPlus size={16} />Add Employee</Button>
          <Button tone="secondary" onClick={() => navigate('/soil-testing/pending')}><CalendarCheck size={16} />Assign Soil Test</Button>
          <Button tone="secondary" onClick={() => navigate('/users/KS-USR-1001/documents')}><ShieldCheck size={16} />Verify Documents</Button>
          <Button tone="secondary" onClick={() => navigate('/finance')}><Download size={16} />Export Revenue Report</Button>
          <Button tone="secondary" onClick={() => navigate('/subscriptions')}><BadgeIndianRupee size={16} />Manage Subscriptions</Button>
        </div>
      </section>
    </div>
  )
}
