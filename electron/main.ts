import { app, BrowserWindow, ipcMain, dialog, protocol } from 'electron'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createVideoWithImageAndAudio } from './services/videoService';
import os from 'os';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

app.whenReady().then(() => {

  protocol.registerFileProtocol("media-loader", (request, callback) => {
    const url = request.url.replace("media-loader://", "");
    try {
      return callback(url);
    } catch (err) {
      console.error(err);
      return callback(404);
    }
  });

  const win = new BrowserWindow({
    frame: false,
    width: 900,
    height: 900,
    minHeight: 400,
    minWidth: 400,
    icon: join(__dirname, '../public/favicon.ico'),
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#f3f3f300',
      symbolColor: '#434343',
      height: 30,
    },
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: join(__dirname, 'preload.mjs'),
    },
  })

  ipcMain.handle('getTempDir', async () => {
    return os.tmpdir();
  });

  ipcMain.handle('open-directory-dialog', async (event) => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (result.canceled) {
      return { canceled: true };
    } else {
      return { canceled: false, path: result.filePaths[0] };
    }
  });

  ipcMain.handle('setVideoOutputPath', async (event, path) => {
    const configPath = join(app.getPath('userData'), 'config.json');
    try {
      await fs.promises.writeFile(configPath, JSON.stringify({ videoSavePath: path }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('getVideoOutputPath', async () => {
    const configPath = join(app.getPath('userData'), 'config.json');
    try {
      const data = await fs.promises.readFile(configPath, 'utf-8');
      return { success: true, path: JSON.parse(data).videoSavePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('create-video', async (event, imagePath, audioPath, outputPath) => {
    try {
      await createVideoWithImageAndAudio(imagePath, audioPath, outputPath);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('delete-file', async (event, path) => {
    if (!path.endsWith('.mp4')) {
      return { success: false, error: 'File is not a valid MP4 file' };
    }

    try {
      await fs.promises.unlink(path);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('darkMode:toggle', (event, dark: boolean) => {
    // This somehow throws an error. The toggle still works with the code disabled on startup
    // win.setTitleBarOverlay(
    //   dark
    //     ? { color: '#21212100', symbolColor: '#999999' }
    //     : { color: '#f3f3f300', symbolColor: '#434343' },
    // )
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    // Open dev tools
    // win.webContents.openDevTools()
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html')
  }
})

app.on('browser-window-created', (e, win) => {
  win.removeMenu()
})
