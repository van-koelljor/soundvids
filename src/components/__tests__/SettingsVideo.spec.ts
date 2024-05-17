import setupVuetify from './setup/vuetify'
import SettingsVideo from '@/components/Settings/SettingsVideo.vue'
import { render } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'

describe('SettingsVideo', () => {
  beforeEach(() => {
    setupVuetify()
  })

  it('renders correctly', () => {
    const { getByText } = render(SettingsVideo, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    expect(getByText('Video Creator Settings')).toBeInTheDocument()
  })
})
