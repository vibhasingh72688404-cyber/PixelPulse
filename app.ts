// app.ts — wires the typed model to the page
import {
  Task,
  TaskStatus,
  addTask,
  advanceTask,
  completeTask,
  deleteTask,
  filterByStatus,
} from "./model.js";

type Filter = "all" | TaskStatus;

let tasks: Task[] = [];
let filter: Filter = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const statusSelect = document.getElementById("status") as HTMLSelectElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const chipsEl = document.getElementById("chips") as HTMLDivElement;
const listEl = document.getElementById("list") as HTMLUListElement;
const countEl = document.getElementById("count") as HTMLParagraphElement;

const FILTERS: Filter[] = ["all", "todo", "in-progress", "done"];

function visibleTasks(): Task[] {
  return filter === "all" ? tasks : filterByStatus(tasks, filter);
}

function renderChips(): void {
  chipsEl.innerHTML = "";
  FILTERS.forEach((f) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (f === filter ? " active" : "");
    btn.textContent = f;
    btn.onclick = () => {
      filter = f;
      render();
    };
    chipsEl.appendChild(btn);
  });
}

function renderList(): void {
  listEl.innerHTML = "";
  const shown = visibleTasks();

  if (shown.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "Nothing here yet.";
    listEl.appendChild(empty);
  }

  shown.forEach((t) => {
    const li = document.createElement("li");
    li.className = "task";

    const badge = document.createElement("span");
    badge.className = `badge ${t.status}`;
    badge.textContent = t.status;

    const title = document.createElement("span");
    title.className = "title" + (t.status === "done" ? " done" : "");
    title.textContent = t.title;

    li.appendChild(badge);
    li.appendChild(title);

    if (t.status !== "done") {
      const advance = document.createElement("button");
      advance.className = "icon advance";
      advance.textContent = "advance →";
      advance.onclick = () => {
        tasks = advanceTask(tasks, t.id);
        render();
      };

      const complete = document.createElement("button");
      complete.className = "icon complete";
      complete.textContent = "✓ done";
      complete.onclick = () => {
        tasks = completeTask(tasks, t.id);
        render();
      };

      li.appendChild(advance);
      li.appendChild(complete);
    }

    const del = document.createElement("button");
    del.className = "icon delete";
    del.textContent = "✕";
    del.setAttribute("aria-label", "Delete task");
    del.onclick = () => {
      tasks = deleteTask(tasks, t.id);
      render();
    };
    li.appendChild(del);

    listEl.appendChild(li);
  });

  const doneCount = filterByStatus(tasks, "done").length;
  countEl.textContent = `${doneCount} of ${tasks.length} done`;
}

function render(): void {
  renderChips();
  renderList();
}

function handleAdd(): void {
  const title = titleInput.value.trim();
  if (!title) return;
  tasks = addTask(tasks, title, statusSelect.value as TaskStatus);
  titleInput.value = "";
  titleInput.focus();
  render();
}

addBtn.onclick = handleAdd;
titleInput.onkeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") handleAdd();
};

render();
