const { app } = require('electron');

const createAddItemWindow = require('../actions/create-add-item-window.js');

module.exports = () => [
  {
    label: 'File',
    submenu: [
      { label: 'Add item', click: () => createAddItemWindow() },
      { label: 'Remove item' },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click: () => app.quit(),
      },
    ],
  },
  { label: 'File' },
  { label: 'File' },
  { label: 'File' },
];
