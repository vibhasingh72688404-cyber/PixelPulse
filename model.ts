// model.ts — the typed blueprint for TaskFlow

export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

// Add a new task with the chosen status (defaults to "todo").
export function addTask(
  tasks: Task[],
  title: string,
  status: TaskStatus = "todo"
): Task[] {
  const newTask: Task = { id: nextId++, title, status };
  return [...tasks, newTask];
}

// Mark a task done by id.
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) =>
    t.id === id ? { ...t, status: "done" as TaskStatus } : t
  );
}

// Move a task one step: todo -> in-progress -> done.
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => {
    if (t.id !== id) return t;
    const next: TaskStatus =
      t.status === "todo" ? "in-progress" : "done";
    return { ...t, status: next };
  });
}

// Remove a task by id.
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

// Return only the tasks matching a given status.
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}
