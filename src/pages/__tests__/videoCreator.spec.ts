import VideoCreatorPage from '@/pages/videoCreator.vue'
import setupVuetify from './setup/vuetify'
import { createTestingPinia } from '@pinia/testing'
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
    expect(getByText('Drop audio file here')).toBeInTheDocument()
    expect(getByText('Drop image file here')).toBeInTheDocument()
  })
})
