import { TodoTaskView } from "./TodoTaskView.js";

export class TodoListView {
  createElement(todoTasks, { onUpdateTodoStatus, onDeleteTodo, onEditTodoName }) {
    const todoListElement = document.createElement('ul');
    todoTasks.forEach(todoTask => {
      const todoTaskView = new TodoTaskView();
      const todoTaskElement = todoTaskView.createElement(todoTask, {
        onUpdateTodoStatus,
        onDeleteTodo,
        onEditTodoName
      });
      todoListElement.appendChild(todoTaskElement);
    });
    return todoListElement;
  }
}
