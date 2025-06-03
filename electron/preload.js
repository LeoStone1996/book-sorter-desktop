const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Data persistence
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data'),
  
  // Preferences
  getPreferences: () => ipcRenderer.invoke('get-preferences'),
  setPreference: (key, value) => ipcRenderer.invoke('set-preference', key, value),
  
  // Premium features
  activatePremium: () => ipcRenderer.invoke('activate-premium'),
  
  // Analytics
  trackEvent: (eventData) => ipcRenderer.invoke('track-event', eventData),
  
  // Menu events
  onMenuAction: (callback) => {
    ipcRenderer.on('menu-new-book', callback);
    ipcRenderer.on('menu-search', callback);
    ipcRenderer.on('menu-statistics', callback);
    ipcRenderer.on('menu-preferences', callback);
    ipcRenderer.on('menu-upgrade', callback);
    ipcRenderer.on('menu-restore', callback);
  },
  
  // Import/Export events
  onImportData: (callback) => ipcRenderer.on('import-data', callback),
  
  // App info
  getVersion: () => process.versions.electron,
  getPlatform: () => process.platform,
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});

// Expose a limited API for the enhanced features
contextBridge.exposeInMainWorld('bookSorterAPI', {
  // Platform detection
  isMac: process.platform === 'darwin',
  isWindows: process.platform === 'win32',
  isLinux: process.platform === 'linux',
  
  // App metadata
  version: '2.0.0',
  name: 'Book Sorter Pro',
  
  // Feature flags
  features: {
    nativeMenus: true,
    autoUpdater: true,
    secureStorage: true,
    analytics: true,
    premium: true
  }
});

// Security: Remove Node.js globals in renderer
delete window.require;
delete window.exports;
delete window.module;

// Log that preload script has loaded
console.log('Book Sorter Pro preload script loaded');
