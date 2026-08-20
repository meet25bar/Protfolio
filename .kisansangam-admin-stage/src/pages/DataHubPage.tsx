import {
  BellRing,
  Bot,
  ChevronRight,
  CloudSun,
  Database,
  Languages,
  Leaf,
  MessageSquareText,
  Sprout,
  TestTube2,
  TrendingUp,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, MetricCard, PageHeader } from '../components/ui'

const modules = [
  { title: 'Crop Database', description: 'Crop profiles, seasons and cultivation parameters', path: '/data/crops', icon: Sprout, count: '146 crops' },
  { title: 'Soil Database', description: 'Soil types, district coverage and crop mappings', path: '/data/soils', icon: Database, count: '18 soil types' },
  { title: 'Fertilizer Guide', description: 'Dosage rules, crop guides and approvals', path: '/data/fertilizers', icon: TestTube2, count: '92 rules' },
  { title: 'Market Prices', description: 'APMC prices, historical trends and alerts', path: '/data/market-prices', icon: TrendingUp, count: '34 markets' },
  { title: 'Weather Alert Rules', description: 'Thresholds, regions and alert delivery', path: '/data/weather-alerts', icon: CloudSun, count: '12 active rules' },
  { title: 'Notification Templates', description: 'SMS, email, WhatsApp and in-app content', path: '/data/notifications', icon: MessageSquareText, count: '28 templates' },
  { title: 'Language Content', description: 'Gujarati, Hindi and English localization', path: '/data/languages', icon: Languages, count: '1,420 keys' },
  { title: 'AI Recommendation Rules', description: 'Model weights, simulations and approvals', path: '/data/ai-rules', icon: Bot, count: '14 rules' },
]

export function DataHubPage() {
  const navigate = useNavigate()
  return (
    <div>
      <PageHeader title="Data Management & Reports" description="Maintain platform data, localized content and intelligent recommendation rules" />
      <div className="grid grid-cols-4 gap-3">
        <MetricCard label="Data Records" value="18,420" trend="+312 this month" />
        <MetricCard label="Published Rules" value="164" trend="+8 this month" />
        <MetricCard label="Pending Reviews" value="23" trend="Requires attention" tone="amber" />
        <MetricCard label="Data Quality" value="97.4%" trend="+1.2%" />
      </div>
      <section className="mt-6 grid grid-cols-4 gap-4">
        {modules.map(({ title, description, path, icon: Icon, count }) => (
          <Card key={path} className="group overflow-hidden p-0 transition hover:-translate-y-0.5 hover:shadow-lg">
            <button className="w-full p-5 text-left" onClick={() => navigate(path)}>
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon size={23} />
                </span>
                <ChevronRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-700" size={20} />
              </div>
              <h2 className="mt-5 text-base font-bold text-ink">{title}</h2>
              <p className="mt-1 min-h-10 text-sm leading-5 text-muted">{description}</p>
              <p className="mt-4 text-xs font-semibold text-brand-700">{count}</p>
            </button>
          </Card>
        ))}
      </section>
      <Card className="mt-6 flex items-center gap-4 border-l-4 border-l-amber-500 p-5">
        <BellRing className="text-amber-500" />
        <div className="flex-1">
          <p className="font-bold">23 changes are waiting for review</p>
          <p className="text-sm text-muted">Review draft crop, fertilizer, translation and AI rule changes before publishing.</p>
        </div>
        <button className="text-sm font-semibold text-brand-700" onClick={() => navigate('/data/ai-rules/review')}>Open review queue</button>
      </Card>
      <div className="mt-6 flex items-center gap-2 text-xs text-muted">
        <Leaf size={14} className="text-brand-700" />
        Last full data sync completed today at 08:45
      </div>
    </div>
  )
}
