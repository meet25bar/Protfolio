import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Eye, EyeOff, Leaf, LockKeyhole, Mail, ShieldCheck, Users } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../components/ui'
import { useAdminStore } from '../store/useAdminStore'
import type { AdminRole } from '../types'

const schema = z.object({
  email: z.string().email('Enter a valid admin email'),
  password: z.string().min(6, 'Password must contain at least 6 characters'),
  role: z.enum(['Super Admin', 'System Admin', 'Finance Admin', 'Field Operations Admin', 'Content Admin']),
  remember: z.boolean(),
})

type LoginValues = z.infer<typeof schema>

const benefits = [
  'Manage farmers and land owners',
  'Track subscriptions and payments',
  'Assign soil testing field operations',
  'View reports and platform analytics',
]

export function LoginPage() {
  const session = useAdminStore((state) => state.session)
  const login = useAdminStore((state) => state.login)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'admin@kisansangam.com', password: 'admin123', role: 'Super Admin', remember: true },
  })

  if (session) return <Navigate to="/dashboard" replace />

  const submit = (values: LoginValues) => {
    login(values.email, values.role as AdminRole, values.remember)
    navigate('/dashboard')
  }

  return (
    <main className="grid min-h-screen min-w-[1280px] grid-cols-[640px_1fr] bg-brand-50">
      <section className="flex min-h-screen flex-col bg-[#1a3a1e] px-16 py-14 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-900">
            <Leaf size={29} />
          </span>
          <span className="text-2xl font-bold">KisanSangam</span>
        </div>
        <div className="mt-14">
          <h1 className="text-[38px] font-bold leading-tight">Admin Portal</h1>
          <p className="mt-4 max-w-lg text-lg leading-7 text-green-100/75">
            Centralized control center for smart agriculture field operations, analytics, and platform management.
          </p>
        </div>
        <img
          src="/assets/login-illustration.jpg"
          alt="Agriculture team using digital field analytics"
          className="mt-6 h-80 w-full rounded-2xl object-cover"
        />
        <ul className="mt-auto space-y-4 pt-6">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 text-base text-green-50">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-700">
                <Check size={15} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-green-100/50">© 2026 KisanSangam. All rights reserved.</p>
      </section>
      <section className="flex min-h-screen items-center justify-center p-10">
        <div className="w-[480px] rounded-3xl bg-white px-12 py-12 shadow-[0_20px_60px_rgba(20,69,23,0.08)]">
          <h2 className="text-[32px] font-bold text-slate-900">Admin Login</h2>
          <p className="mt-2 text-base text-slate-500">Sign in to manage KisanSangam operations</p>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit(submit)} noValidate>
            <label className="block">
              <span className="field-label">Email Address</span>
              <span className="relative block">
                <Mail className="absolute left-4 top-3.5 text-slate-500" size={19} />
                <input className="field h-12 pl-12" type="email" placeholder="Enter admin email" {...register('email')} />
              </span>
              {errors.email && <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span>}
            </label>
            <label className="block">
              <span className="field-label">Password</span>
              <span className="relative block">
                <LockKeyhole className="absolute left-4 top-3.5 text-slate-500" size={19} />
                <input className="field h-12 px-12" type={showPassword ? 'text' : 'password'} placeholder="Enter password" {...register('password')} />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-3.5 text-slate-500"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </span>
              {errors.password && <span className="mt-1 block text-xs text-red-600">{errors.password.message}</span>}
            </label>
            <label className="block">
              <span className="field-label">Assign Role</span>
              <span className="relative block">
                <Users className="absolute left-4 top-3.5 text-slate-500" size={19} />
                <select className="field h-12 pl-12" {...register('role')}>
                  <option>Super Admin</option>
                  <option>System Admin</option>
                  <option>Finance Admin</option>
                  <option>Field Operations Admin</option>
                  <option>Content Admin</option>
                </select>
              </span>
            </label>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4 accent-brand-700" {...register('remember')} />
                Remember me
              </label>
              <button type="button" className="text-sm font-semibold text-brand-900 hover:underline">
                Forgot password?
              </button>
            </div>
            <Button className="h-14 w-full text-base" disabled={isSubmitting} type="submit">
              Login to Dashboard
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-slate-500">Secure access only for authorized staff</p>
          <p className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
            <ShieldCheck size={17} />
            Protected admin access • Activity is monitored
          </p>
        </div>
      </section>
    </main>
  )
}
