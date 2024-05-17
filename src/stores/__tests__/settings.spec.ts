import { useSettingsStore } from '../settings'

describe('Settings Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    global.window.electronAPI = {
      setVideoOutputPath: vi.fn(),
      getVideoOutputPath: vi.fn(() => Promise.resolve({ success: true, path: 'path/from/api' }))
    }
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('sets video output path', () => {
    const store = useSettingsStore()
    store.setVideoOutputPath('path/to/video')
    expect(store.videoOutputPath).toBe('path/to/video')
    expect(window.electronAPI.setVideoOutputPath).toHaveBeenCalledWith('path/to/video')
  })

  it('loads video output path', async () => {
    const store = useSettingsStore()
    await store.loadVideoOutputPath()
    expect(store.videoOutputPath).toBe('path/from/api')
  })
})
