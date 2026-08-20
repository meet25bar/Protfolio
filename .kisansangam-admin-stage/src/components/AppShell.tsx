import {
  Banknote,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  CreditCard,
  Database,
  FlaskConical,
  LayoutDashboard,
  Leaf,
  LogOut,
  Map,
  Search,
  Settings2,
  Users,
} from 'lucide-react'
import type { PropsWithChildren, ReactNode } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { screenByPath } from '../app/screenManifest'
import { useAdminStore } from '../store/useAdminStore'

interface NavItem {
  label: string
  to: string
  icon?: ReactNode
  children?: { label: string; to: string }[]
}

const navigation: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={19} /> },
  { label: 'Users', to: '/users', icon: <Users size={19} /> },
  { label: 'Subscriptions', to: '/subscriptions', icon: <CreditCard size={19} /> },
  {
    label: 'Finance',
    to: '/finance',
    icon: <Banknote size={19} />,
    children: [
      { label: 'Finance Dashboard', to: '/finance' },
      { label: 'Cost & Profit', to: '/finance/cost-profit' },
    ],
  },
  { label: 'Employees', to: '/employees', icon: <BriefcaseBusiness size={19} /> },
  { label: 'Soil Testing', to: '/soil-testing', icon: <FlaskConical size={19} /> },
  { label: 'Land Leasing', to: '/land-leasing', icon: <Map size={19} /> },
  {
    label: 'Data Management',
    to: '/data',
    icon: <Database size={19} />,
    children: [
      { label: 'Crop Database', to: '/data/crops' },
      { label: 'Soil Database', to: '/data/soils' },
      { label: 'Fertilizer Guide', to: '/data/fertilizers' },
      { label: 'Market Prices', to: '/data/market-prices' },
      { label: 'Weather Alert Rules', to: '/data/weather-alerts' },
      { label: 'Notification Templates', to: '/data/notifications' },
      { label: 'Language Content', to: '/data/languages' },
      { label: 'AI Recommendation Rules', to: '/data/ai-rules' },
    ],
  },
]

function SidebarItem({ item }: { item: NavItem }) {
  const location = useLocation()
  const childActive = item.children?.some((child) => location.pathname.startsWith(child.to))
  const active = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(`${item.to}/`)) || childActive

  return (
    <div>
      <NavLink
        to={item.to}
        className={`flex h-11 items-center gap-3 rounded-lg px-4 text-sm font-medium transition ${
          active ? 'bg-brand-800 text-white' : 'text-green-100/80 hover:bg-white/5 hover:text-white'
        }`}
      >
        <span aria-hidden="true">{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        {item.children && <ChevronDown size={14} aria-hidden="true" />}
      </NavLink>
      {item.children && (
        <div className="mt-1 space-y-0.5">
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              end
              className={({ isActive }) =>
                `block rounded-md py-2 pl-12 pr-3 text-[13px] transition ${
                  isActive ? 'bg-white/10 font-semibold text-white' : 'text-green-100/75 hover:text-white'
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export function AppShell({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()
  const session = useAdminStore((state) => state.session)
  const logout = useAdminStore((state) => state.logout)
  const screen = screenByPath.get(location.pathname)

  return (
    <div className="flex min-h-screen min-w-[1280px] bg-workspace">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-brand-900 p-5 text-white">
        <NavLink to="/dashboard" className="mb-7 flex items-center gap-3 rounded-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand-900">
            <Leaf size={22} />
          </span>
          <span className="text-xl font-bold">KisanSangam</span>
        </NavLink>
        <nav aria-label="Primary navigation" className="-mr-2 flex-1 space-y-1 overflow-y-auto pr-2">
          {navigation.map((item) => (
            <SidebarItem key={item.to} item={item} />
          ))}
        </nav>
        <div className="mt-4 border-t border-white/10 pt-4">
          <button
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-green-100/80 hover:bg-white/5 hover:text-white"
            onClick={() => {
              logout()
              navigate('/login')
            }}
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
      <div className="ml-60 flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-line bg-white px-8">
          <div>
            <p className="text-lg font-bold text-ink">{screen?.title || 'KisanSangam Admin'}</p>
            <p className="text-xs text-muted">{screen?.description || 'Agriculture operations control center'}</p>
          </div>
          <div className="flex items-center gap-5">
            <label className="flex h-9 w-80 items-center gap-2 rounded-lg bg-workspace px-3 text-sm text-muted">
              <Search size={16} aria-hidden="true" />
              <span className="sr-only">Global search</span>
              <input className="w-full bg-transparent outline-none placeholder:text-slate-400" placeholder="Search users, invoices, soil tests..." />
            </label>
            <button aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button aria-label="Portal settings" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100">
              <Settings2 size={19} />
            </button>
            <div className="text-right">
              <p className="text-sm font-bold">Admin</p>
              <p className="text-[11px] font-semibold text-brand-700">{session?.role}</p>
            </div>
            <img src="/assets/admin-avatar.jpg" alt="" className="h-9 w-9 rounded-full object-cover" />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
