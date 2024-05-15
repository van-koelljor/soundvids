import Settings from '../settings.vue'
import { render } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import { findByText } from '@testing-library/vue'

describe('Settings Page', () => {
  it('renders correctly', async () => {
    const vuetify = createVuetify()
    const { container } = render(Settings, {
      global: {
        plugins: [createTestingPinia(), vuetify]
      }
    })
    await findByText(container as HTMLElement, 'Video Creator Settings')
  })
})
