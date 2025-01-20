const todoList = document.getElementById('todo-list');
const addItem = document.getElementById('add-item');
const addButton = document.getElementById('btn-add');
// const deleteButton = document.getElementById('btn-delete');

addButton.addEventListener('click', (e) => {
  e.preventDefault();

  const newItem = document.getElementById('add-item').value;
  document.getElementById('todo-list').innerHTML +=
    `<li><input type="checkbox" name="cbx-done" id="" />  ${newItem} <button type="button" id="btn-delete">Delete</button></li>`;
  addItem.value = '';
});

todoList.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('btn-delete')) {
    const li = e.target.parentElement;
    if (li) {
      li.remove();
    }
  }
});

todoList.addEventListener('change', (e) => {
  if (e.target && e.target.name === 'cbx-done') {
    const li = e.target.parentElement;
    li.classList.toggle('checked-item');
  }
});
