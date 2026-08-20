import { describe, expect, it } from 'vitest'
import { screenManifest } from '../src/app/screenManifest'
import { transitions } from '../src/app/transitions'

describe('Figma screen manifest', () => {
  it('covers the complete Figma and FigJam surface', () => {
    expect(screenManifest.length).toBeGreaterThanOrEqual(85)
  })

  it('keeps node/path pairs addressable and unique', () => {
    const paths = screenManifest.map((screen) => screen.path)
    expect(new Set(paths).size).toBe(paths.length)
    for (const screen of screenManifest) {
      expect(screen.nodeId).toMatch(/^\d+:\d+$/)
      expect(screen.path.startsWith('/')).toBe(true)
    }
  })

  it('only links transitions to registered screens', () => {
    const paths = new Set(screenManifest.map((screen) => screen.path))
    for (const [source, items] of Object.entries(transitions)) {
      expect(paths.has(source)).toBe(true)
      for (const transition of items) expect(paths.has(transition.to)).toBe(true)
    }
  })
})
