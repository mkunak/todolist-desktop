const electron = require('electron');

const { ipcRenderer } = electron;

const listContainer = document.querySelector('#todo-list');

ipcRenderer.on('item:add', (e, item) => {
  const listItem = `
  <tr>
    <td>${item.name}</td>
    <td>${item.quant}</td>
    <td>
      <button
        class="btn red delete-item" 
        style="margin-left: 1rem;">
        Delete
      </button>
    </td>
  </tr>
  `;

  listContainer.insertAdjacentHTML('beforeend', listItem);

  const deletes = document.querySelectorAll('.delete-item');
  deletes.forEach((del) => {
    del.addEventListener('click', (event) => {
      event.target.closest('tr').remove();
    });
  });
});

ipcRenderer.on('list:clear', () => {
  listContainer.innerHTML = '';
});
