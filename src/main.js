/* eslint-disable object-curly-newline */
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;

const createAddItemWindow = () => {
  addWindow = new BrowserWindow({
    width: 600,
    height: 300,
    title: 'Add todo list item',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'windows/view/add-item.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Garbage collection handle
  addWindow.on('close', () => {
    addWindow = null;
  });
};

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add item',
        accelerator: 'Ctrl+P',
        click: () => createAddItemWindow(),
      },
      {
        label: 'Clear list',

        click: () => {
          mainWindow.webContents.send('list:clear');
        },
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click: () => app.quit(),
      },
    ],
  },
];

// Listen for app to be ready:
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    minWidth: 370,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'windows/view/main.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Quit app when closed
  mainWindow.on('closed', () => app.quit());

  // Build menu from my data
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Insert Menu into app
  Menu.setApplicationMenu(mainMenu);
});

// catch item:add
ipcMain.on('item:add', (e, item) => {
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
});

// if on Mac, add empty {} from the beginning
if (process.platform === 'darwin') mainMenuTemplate.unshift({});

// if not production, show development tool
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
        click: (item, focusedWindow) => {
          focusedWindow.toggleDevTools();
        },
      },
      { role: 'reload' },
    ],
  });
}
