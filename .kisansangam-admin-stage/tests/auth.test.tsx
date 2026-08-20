import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../src/App'
import { useAdminStore } from '../src/store/useAdminStore'

describe('authentication', () => {
  beforeEach(() => {
    useAdminStore.setState({ session: null })
  })

  it('redirects protected pages to login', async () => {
    render(<MemoryRouter initialEntries={['/dashboard']}><App /></MemoryRouter>)
    expect(await screen.findByRole('heading', { name: 'Admin Login' })).toBeInTheDocument()
  })

  it('validates and starts a mock admin session', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>)
    await user.clear(screen.getByLabelText('Email Address'))
    await user.type(screen.getByLabelText('Email Address'), 'operator@kisansangam.com')
    await user.click(screen.getByRole('button', { name: 'Login to Dashboard' }))
    expect(await screen.findByRole('heading', { name: 'Admin Dashboard' })).toBeInTheDocument()
    expect(useAdminStore.getState().session?.email).toBe('operator@kisansangam.com')
  })
})
