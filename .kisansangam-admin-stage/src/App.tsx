import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { mainModulePaths, quickActionDestinations, screenManifest, type ScreenDefinition } from './app/screenManifest'
import { AppShell } from './components/AppShell'
import { ToastProvider } from './components/ToastProvider'
import { Button, EmptyState } from './components/ui'
import { DashboardPage } from './pages/DashboardPage'
import { DataHubPage } from './pages/DataHubPage'
import { EmployeeFormPage } from './pages/EmployeeFormPage'
import { LoginPage } from './pages/LoginPage'
import { ModulePage } from './pages/ModulePage'
import { WorkflowPage } from './pages/WorkflowPage'
import { useAdminStore } from './store/useAdminStore'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const session = useAdminStore((state) => state.session)
  return session ? children : <Navigate to="/login" replace />
}

function PortalRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  )
}

function elementForScreen(screen: ScreenDefinition) {
  if (screen.path === '/login') return <LoginPage />
  if (screen.path === '/dashboard') return <PortalRoute><DashboardPage /></PortalRoute>
  if (screen.path === '/data') return <PortalRoute><DataHubPage /></PortalRoute>
  if (screen.path === '/employees/new') return <PortalRoute><EmployeeFormPage /></PortalRoute>
  if (quickActionDestinations[screen.path]) {
    return (
      <ProtectedRoute>
        <Navigate to={quickActionDestinations[screen.path]} replace />
      </ProtectedRoute>
    )
  }
  if (mainModulePaths.has(screen.path)) return <PortalRoute><ModulePage /></PortalRoute>
  return <PortalRoute><WorkflowPage screen={screen} /></PortalRoute>
}

function NotFoundPage() {
  return (
    <PortalRoute>
      <EmptyState title="Screen not found" description="The requested admin screen is not part of the KisanSangam workflow." />
      <div className="mt-4 flex justify-center">
        <Button onClick={() => window.location.assign('/dashboard')}>Return to Dashboard</Button>
      </div>
    </PortalRoute>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {screenManifest.map((screen) => (
          <Route key={`${screen.nodeId}-${screen.path}`} path={screen.path} element={elementForScreen(screen)} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ToastProvider>
  )
}
