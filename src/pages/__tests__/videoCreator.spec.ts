import VideoCreatorPage from '@/pages/videoCreator.vue'
import setupVuetify from './setup/vuetify'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'

describe('VideoCreatorPage', () => {
  beforeEach(() => {
    setupVuetify()
  })

  it('renders correctly', () => {
    const { getByText } = render(VideoCreatorPage, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    expect(getByText('Drop the audio file here')).toBeInTheDocument()
    expect(getByText('Drop one or multiple image files here')).toBeInTheDocument()
    expect(getByText('Add to Queue')).toBeInTheDocument()
  })
})
