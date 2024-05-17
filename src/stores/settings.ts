export const useSettingsStore = defineStore('settings', {
  state: () => ({
    videoOutputPath: ''
  }),
  actions: {
    setVideoOutputPath(path: string) {
      this.videoOutputPath = path;
      window.electronAPI.setVideoOutputPath(path);
    },
    async loadVideoOutputPath() {
      const result = await window.electronAPI.getVideoOutputPath();
      if (result.success) {
        this.videoOutputPath = result.path;
      }
    }
  }
});
