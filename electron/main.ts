import { app, BrowserWindow,ipcMain  } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { writeFile,stat,mkdir, appendFile,readFile } from 'node:fs/promises'
import { configs } from '../src/type/type'

//@ts-ignore
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

//注册事件，写入ipc
const DATA_PATH = path.join(app.getPath('userData'),'data','config.json')
ipcMain.handle('saveData',async (_event,content:string)=>{
  //如果不存在，创建目录和空文件
  try {
    await stat(DATA_PATH)
  } catch (err) {
    try {
      await mkdir(path.join(app.getPath('userData'),'data'))
      await appendFile(DATA_PATH,'')
    } catch (error) {
      console.error(error)
    }
    console.error(err)
  }
  try {
    await writeFile(DATA_PATH, content, 'utf-8')
    return { success: true }
  } catch (err) {
    return { success: false, message: (err as Error).message }
  }
})

//读取data数据
ipcMain.handle('readData',async ():Promise<configs>=>{
  const buffer = await readFile(DATA_PATH,{encoding:'utf-8'})
  const strings = buffer.toString()
  const config = JSON.parse(strings)
  return config
})




function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
