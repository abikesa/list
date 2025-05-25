fetch('data/tasks.csv')
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split('\n').slice(1);
    const tbody = document.querySelector('#task-table tbody');
    rows.forEach(row => {
      const [task, created, due, done] = row.split(',');
      const now = new Date();
      const dueDate = new Date(due);
      const diffMs = dueDate - now;
      const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const deltaText = days > 0 ? `in ${days}d` : `${-days}d ago`;
      const rowEl = document.createElement('tr');
      const status = done === 'true' ? '✔' : '';
      rowEl.innerHTML = `
        <td class="${done === 'true' ? 'done' : ''}">${status}</td>
        <td>${task}</td>
        <td>${created}</td>
        <td>${due}</td>
        <td class="${done === 'true' ? 'done' : days < 0 ? 'overdue' : 'upcoming'}">${deltaText}</td>
      `;
      tbody.appendChild(rowEl);
    });
  });
