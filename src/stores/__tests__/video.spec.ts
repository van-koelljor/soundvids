import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useVideoStore } from '../video'
import type { Video } from '@/types/video'

describe('Video Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a video', () => {
    const store = useVideoStore()
    const video: Video = { id: '123', src: 'path/to/video.mp4' }
    store.addCreatedVideo(video)
    expect(store.createdVideos.some(v => v.id === video.id && v.src === video.src)).toBeTruthy()
  })

  it('removes a video', () => {
    const store = useVideoStore()
    const video1: Video = { id: '123', src: 'path/to/video.mp4' }
    const video2: Video = { id: '456', src: 'path/to/another_video.mp4' }
    store.addCreatedVideo(video1)
    store.addCreatedVideo(video2)
    store.removeCreatedVideo('123')
    expect(store.createdVideos.some(v => v.id === video1.id)).toBeFalsy()
    expect(store.createdVideos.some(v => v.id === video2.id)).toBeTruthy()
  })
})
