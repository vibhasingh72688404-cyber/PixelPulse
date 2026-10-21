// model.ts — the typed blueprint for TaskFlow
let nextId = 1;
// Add a new task with the chosen status (defaults to "todo").
export function addTask(tasks, title, status = "todo") {
    const newTask = { id: nextId++, title, status };
    return [...tasks, newTask];
}
// Mark a task done by id.
export function completeTask(tasks, id) {
    return tasks.map((t) => t.id === id ? { ...t, status: "done" } : t);
}
// Move a task one step: todo -> in-progress -> done.
export function advanceTask(tasks, id) {
    return tasks.map((t) => {
        if (t.id !== id)
            return t;
        const next = t.status === "todo" ? "in-progress" : "done";
        return { ...t, status: next };
    });
}
// Remove a task by id.
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
// Return only the tasks matching a given status.
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
