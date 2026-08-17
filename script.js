let tasks = [];
let filter = 'all';

const list = document.getElementById('taskList');
const input = document.getElementById('taskInput');

// HU-01: Agregar tarea
document.getElementById('addBtn').onclick = () => {
  if (!input.value.trim()) return;
  tasks.push({ id: Date.now(), text: input.value, done: false });
  input.value = '';
  render();
};

function render() {
  list.innerHTML = '';
  tasks
    .filter(t => filter === 'all' || (filter === 'pending' && !t.done) || (filter === 'done' && t.done))
    .forEach(t => {
      const li = document.createElement('li');
      li.className = t.done ? 'done' : '';
      li.innerHTML = `
        <span>${t.text}</span>
        <button onclick="toggle(${t.id})">✔</button>
        <button onclick="edit(${t.id})">✎</button>
        <button onclick="remove(${t.id})">✕</button>`;
      list.appendChild(li);
    });
}

// HU-02: Marcar como completada
// Verificado: funciona correctamente en el navegador
function toggle(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  render();
}

// HU-03: Eliminar tarea
// Verificado: funciona correctamente en el navegador
function remove(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

// HU-04: Editar tarea
function edit(id) {
  const nuevo = prompt('Editar tarea:');
  if (nuevo) tasks = tasks.map(t => t.id === id ? { ...t, text: nuevo } : t);
  render();
}

// HU-05: Filtrar tareas
document.querySelectorAll('.filters button').forEach(btn => {
  btn.onclick = () => { filter = btn.dataset.filter; render(); };
});