import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { screenManifest } from '../src/app/screenManifest'
import { useAdminStore } from '../src/store/useAdminStore'

describe('Figma route render coverage', () => {
  it.each(screenManifest.map((item) => [item.nodeId, item.path] as const))(
    'renders node %s at %s without falling through',
    async (_nodeId, path) => {
      useAdminStore.setState({
        session: {
          email: 'coverage@kisansangam.com',
          role: 'Super Admin',
          remember: true,
        },
      })

      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
      )

      expect(await screen.findByRole('main')).toBeInTheDocument()
      expect(document.body).not.toHaveTextContent('Screen not found')
    },
  )
})
