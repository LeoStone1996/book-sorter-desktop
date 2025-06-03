const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const Store = require('electron-store');
const path = require('path');
const fs = require('fs');

// Configure logging
log.transports.file.level = 'info';
autoUpdater.logger = log;

// Initialize secure storage
const store = new Store({
  name: 'book-sorter-pro',
  defaults: {
    windowBounds: { width: 1200, height: 800 },
    theme: 'light',
    premium: false,
    firstRun: true
  }
});

class BookSorterApp {
  constructor() {
    this.mainWindow = null;
    this.isDev = process.env.NODE_ENV === 'development';
    this.init();
  }

  init() {
    // Handle app events
    app.whenReady().then(() => this.createWindow());
    app.on('window-all-closed', () => this.handleWindowsClosed());
    app.on('activate', () => this.handleActivate());
    app.on('ready', () => this.setupAutoUpdater());

    // Handle IPC events
    this.setupIPC();

    // Set app user model ID for Windows
    if (process.platform === 'win32') {
      app.setAppUserModelId('com.booksorter.pro');
    }
  }

  createWindow() {
    // Get saved window bounds
    const bounds = store.get('windowBounds');

    // Create the browser window
    this.mainWindow = new BrowserWindow({
      width: bounds.width,
      height: bounds.height,
      minWidth: 800,
      minHeight: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, 'preload.js'),
        webSecurity: true
      },
      icon: this.getIconPath(),
      titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
      show: false, // Don't show until ready
      backgroundColor: '#667eea'
    });

    // Load the app
    const startUrl = this.isDev 
      ? 'http://localhost:3000' 
      : `file://${path.join(__dirname, '../book-sorter/enhanced-index.html')}`;
    
    this.mainWindow.loadURL(startUrl);

    // Show window when ready
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
      
      // Focus window
      if (this.isDev) {
        this.mainWindow.webContents.openDevTools();
      }
    });

    // Handle window events
    this.setupWindowEvents();

    // Set up menu
    this.createMenu();

    // Handle external links
    this.mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });

    // Prevent navigation to external sites
    this.mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl);
      
      if (parsedUrl.origin !== 'http://localhost:3000' && !navigationUrl.startsWith('file://')) {
        event.preventDefault();
        shell.openExternal(navigationUrl);
      }
    });
  }

  setupWindowEvents() {
    // Save window bounds on resize/move
    this.mainWindow.on('resize', () => this.saveWindowBounds());
    this.mainWindow.on('move', () => this.saveWindowBounds());

    // Handle window closed
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // Handle app closing
    this.mainWindow.on('close', (event) => {
      if (process.platform === 'darwin' && !app.isQuittingApp) {
        event.preventDefault();
        this.mainWindow.hide();
      }
    });
  }

  saveWindowBounds() {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      store.set('windowBounds', this.mainWindow.getBounds());
    }
  }

  getIconPath() {
    if (process.platform === 'win32') {
      return path.join(__dirname, '../assets/icon.ico');
    } else if (process.platform === 'darwin') {
      return path.join(__dirname, '../assets/icon.icns');
    } else {
      return path.join(__dirname, '../assets/icon.png');
    }
  }

  createMenu() {
    const template = [
      {
        label: 'File',
        submenu: [
          {
            label: 'New Book',
            accelerator: 'CmdOrCtrl+N',
            click: () => this.sendToRenderer('menu-new-book')
          },
          { type: 'separator' },
          {
            label: 'Import Library',
            accelerator: 'CmdOrCtrl+I',
            click: () => this.handleImport()
          },
          {
            label: 'Export Library',
            accelerator: 'CmdOrCtrl+E',
            click: () => this.handleExport()
          },
          { type: 'separator' },
          {
            label: 'Preferences',
            accelerator: 'CmdOrCtrl+,',
            click: () => this.sendToRenderer('menu-preferences')
          },
          { type: 'separator' },
          {
            role: 'quit'
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectall' }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Search',
            accelerator: 'CmdOrCtrl+F',
            click: () => this.sendToRenderer('menu-search')
          },
          { type: 'separator' },
          {
            label: 'Statistics',
            accelerator: 'CmdOrCtrl+S',
            click: () => this.sendToRenderer('menu-statistics')
          },
          { type: 'separator' },
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        label: 'Premium',
        submenu: [
          {
            label: 'Upgrade to Premium',
            click: () => this.sendToRenderer('menu-upgrade')
          },
          {
            label: 'Restore Purchase',
            click: () => this.sendToRenderer('menu-restore')
          }
        ]
      },
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'About Book Sorter Pro',
            click: () => this.showAbout()
          },
          {
            label: 'Check for Updates',
            click: () => this.checkForUpdates()
          },
          {
            label: 'Report Issue',
            click: () => shell.openExternal('https://github.com/LeoStone1996/book-sorter-desktop/issues')
          },
          {
            label: 'User Guide',
            click: () => shell.openExternal('https://booksorter.pro/guide')
          }
        ]
      }
    ];

    // macOS specific menu adjustments
    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      });

      // Window menu
      template[5].submenu = [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ];
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  setupIPC() {
    // Handle file operations
    ipcMain.handle('save-data', async (event, data) => {
      try {
        store.set('books', data);
        return { success: true };
      } catch (error) {
        log.error('Error saving data:', error);
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('load-data', async () => {
      try {
        return { success: true, data: store.get('books', []) };
      } catch (error) {
        log.error('Error loading data:', error);
        return { success: false, error: error.message };
      }
    });

    // Handle preferences
    ipcMain.handle('get-preferences', async () => {
      return {
        theme: store.get('theme'),
        premium: store.get('premium'),
        firstRun: store.get('firstRun')
      };
    });

    ipcMain.handle('set-preference', async (event, key, value) => {
      store.set(key, value);
      return { success: true };
    });

    // Handle premium features
    ipcMain.handle('activate-premium', async () => {
      store.set('premium', true);
      return { success: true };
    });

    // Handle analytics
    ipcMain.handle('track-event', async (event, eventData) => {
      log.info('Analytics event:', eventData);
      // In production, send to analytics service
      return { success: true };
    });
  }

  sendToRenderer(channel, data = null) {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send(channel, data);
    }
  }

  async handleImport() {
    const result = await dialog.showOpenDialog(this.mainWindow, {
      title: 'Import Book Library',
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    });

    if (!result.canceled && result.filePaths.length > 0) {
      try {
        const data = fs.readFileSync(result.filePaths[0], 'utf8');
        this.sendToRenderer('import-data', JSON.parse(data));
      } catch (error) {
        dialog.showErrorBox('Import Error', 'Failed to import file: ' + error.message);
      }
    }
  }

  async handleExport() {
    const books = store.get('books', []);
    
    const result = await dialog.showSaveDialog(this.mainWindow, {
      title: 'Export Book Library',
      defaultPath: `book-sorter-export-${new Date().toISOString().split('T')[0]}.json`,
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!result.canceled) {
      try {
        const exportData = {
          books,
          exportDate: new Date().toISOString(),
          version: '2.0'
        };
        fs.writeFileSync(result.filePath, JSON.stringify(exportData, null, 2));
        dialog.showMessageBox(this.mainWindow, {
          type: 'info',
          title: 'Export Complete',
          message: 'Your book library has been exported successfully!'
        });
      } catch (error) {
        dialog.showErrorBox('Export Error', 'Failed to export file: ' + error.message);
      }
    }
  }

  showAbout() {
    dialog.showMessageBox(this.mainWindow, {
      type: 'info',
      title: 'About Book Sorter Pro',
      message: 'Book Sorter Pro',
      detail: `Version: ${app.getVersion()}\n\nProfessional book tracking and reading analytics.\n\n© 2024 Book Sorter Pro. All rights reserved.`,
      buttons: ['OK']
    });
  }

  checkForUpdates() {
    autoUpdater.checkForUpdatesAndNotify();
  }

  setupAutoUpdater() {
    if (this.isDev) return;

    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-available', () => {
      dialog.showMessageBox(this.mainWindow, {
        type: 'info',
        title: 'Update Available',
        message: 'A new version is available. It will be downloaded in the background.',
        buttons: ['OK']
      });
    });

    autoUpdater.on('update-downloaded', () => {
      dialog.showMessageBox(this.mainWindow, {
        type: 'info',
        title: 'Update Ready',
        message: 'Update downloaded. The application will restart to apply the update.',
        buttons: ['Restart Now', 'Later']
      }).then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
    });
  }

  handleWindowsClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  handleActivate() {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow();
    } else if (this.mainWindow) {
      this.mainWindow.show();
    }
  }
}

// Initialize the app
new BookSorterApp();

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url.startsWith('https://localhost')) {
    // Allow localhost certificates in development
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});
