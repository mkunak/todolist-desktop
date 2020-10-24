const electron = require('electron');

const { ipcRenderer } = electron;

const formEl = document.querySelector('form');
formEl.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  const item = {
    name: document.querySelector('#todo-item-name').value,
    quant: document.querySelector('#todo-item-quant').value,
  };

  ipcRenderer.send('item:add', item);
}
