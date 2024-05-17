import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    createdVideos: []
  }),
  actions: {
    addCreatedVideo(video) {
      this.createdVideos.push(video);
    },
    removeCreatedVideo(id) {
      this.createdVideos = this.createdVideos.filter(video => video.id !== id);
    }
  }
});
