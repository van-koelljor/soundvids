import { contextBridge, ipcRenderer } from 'electron';
import { join } from 'path';

contextBridge.exposeInMainWorld('electronAPI', {
  getTempDir: () => ipcRenderer.invoke('getTempDir'),
  toggleDark: (dark: boolean) => ipcRenderer.invoke('darkMode:toggle', dark),
  createVideo: (imagePath, audioPath, outputPath) => ipcRenderer.invoke('create-video', imagePath, audioPath, outputPath),
  writeFile: async (path, data) => {
    const { writeFile } = await import('fs/promises');
    return writeFile(path, data);
  },
  deleteFile: (path) => ipcRenderer.invoke('delete-file', path),
  joinPath: (...paths) => join(...paths),
  openDirectoryDialog: () => ipcRenderer.invoke('open-directory-dialog'),
  setVideoOutputPath: (path) => ipcRenderer.invoke('setVideoOutputPath', path)
});
