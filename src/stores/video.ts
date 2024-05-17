import { defineStore } from 'pinia'
import type { Video } from '@/types/video'

export const useVideoStore = defineStore('video', {
  state: () => ({
    createdVideos: [] as Video[]
  }),
  actions: {
    addCreatedVideo(video: Video) {
      this.createdVideos.push(video);
    },
    removeCreatedVideo(id: string) {
      this.createdVideos = this.createdVideos.filter(video => video.id !== id);
    }
  }
});
