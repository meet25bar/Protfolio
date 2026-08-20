import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react'
import { ArrowDown, ArrowUp, CheckCircle2, CircleAlert, Clock3, XCircle } from 'lucide-react'

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={`card ${className}`}>{children}</section>
}

type ButtonTone = 'primary' | 'secondary' | 'danger' | 'ghost'

export function Button({
  tone = 'primary',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: ButtonTone }) {
  const toneClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    ghost: 'border-transparent bg-transparent text-ink hover:bg-slate-100',
  }[tone]
  return (
    <button className={`btn ${toneClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function StatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase()
  const style =
    normalized.includes('active') || normalized.includes('verified') || normalized.includes('complete') || normalized.includes('published') || normalized.includes('approved')
      ? 'bg-emerald-100 text-emerald-700'
      : normalized.includes('pending') || normalized.includes('draft') || normalized.includes('scheduled') || normalized.includes('review') || normalized.includes('progress')
        ? 'bg-amber-100 text-amber-700'
        : normalized.includes('failed') || normalized.includes('rejected') || normalized.includes('blocked') || normalized.includes('disabled')
          ? 'bg-red-100 text-red-700'
          : 'bg-slate-100 text-slate-700'
  const Icon =
    normalized.includes('verified') || normalized.includes('complete') || normalized.includes('published') || normalized.includes('approved')
      ? CheckCircle2
      : normalized.includes('failed') || normalized.includes('rejected') || normalized.includes('blocked')
        ? XCircle
        : normalized.includes('pending') || normalized.includes('draft')
          ? Clock3
          : CircleAlert
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
      <Icon size={13} aria-hidden="true" />
      {value}
    </span>
  )
}

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
}: {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-6">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-semibold text-brand-700">{eyebrow}</p>}
        <h1 className="text-[28px] font-bold leading-tight text-slate-800">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}

export function MetricCard({
  label,
  value,
  trend,
  tone = 'green',
}: {
  label: string
  value: string
  trend?: string
  tone?: 'green' | 'amber' | 'red' | 'blue'
}) {
  const accent = {
    green: 'bg-brand-700',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  }[tone]
  const negative = trend?.startsWith('-')
  return (
    <Card className="relative min-h-[100px] overflow-hidden p-4 pl-5">
      <span className={`absolute inset-y-0 left-0 w-1 ${accent}`} />
      <p className="eyebrow">{label}</p>
      <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
      {trend && (
        <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${negative ? 'text-red-600' : 'text-brand-700'}`}>
          {negative ? <ArrowDown size={13} /> : <ArrowUp size={13} />}
          {trend}
        </p>
      )}
    </Card>
  )
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-line bg-white p-8 text-center">
      <CircleAlert className="mb-3 text-brand-700" size={34} />
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-muted">{description}</p>
    </div>
  )
}
