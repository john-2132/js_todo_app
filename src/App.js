import { render } from "./view/html-utils.js";
import { TodoTaskModel } from "./model/TodoTaskModel.js"
import { TodoListModel } from "./model/TodoListModel.js"
import { TodoListView } from "./view/TodoListView.js";

export class App {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel([]);

  formElement;
  formInputElement;
  todoAllTaskCountElement;
  todoCompletedTaskCountElement;
  todoUncompletedTaskCountElement;
  todoListContainerElement;

  constructor({ formElement, formInputElement, todoAllTaskCountElement, todoCompletedTaskCountElement, todoUncompletedTaskCountElement, todoListContainerElement }) {
    this.formElement = formElement;
    this.formInputElement = formInputElement;
    this.todoAllTaskCountElement = todoAllTaskCountElement;
    this.todoCompletedTaskCountElement = todoCompletedTaskCountElement;
    this.todoUncompletedTaskCountElement = todoUncompletedTaskCountElement;
    this.todoListContainerElement = todoListContainerElement;
  }

  #handleTaskAdd = (name) => {
    this.#todoListModel.addTask(new TodoTaskModel({ name, completed: false }));
  }

  #handleUpdateTaskName = ({ id, name }) => {
    this.#todoListModel.updateTaskName({ id, name });
  }

  #handleUpdateTaskStatus = ({ id, completed }) => {
    this.#todoListModel.updateTaskStatus({ id, completed });
  }

  #handleTaskDelete = ({ id }) => {
    this.#todoListModel.deleteTask({ id });
  }

  #handleSubmit = (event) => {
    event.preventDefault();
    const inputElement = this.formInputElement;
    this.#handleTaskAdd(inputElement.value);
    inputElement.value = "";
  }

  #handleChange = () => {
    const todoAllTaskCountElement = this.todoAllTaskCountElement;
    const todoCompletedTaskCountElement = this.todoCompletedTaskCountElement;
    const todoUncompletedTaskCountElement = this.todoUncompletedTaskCountElement;
    const todoListContainerElement = this.todoListContainerElement;
    const todoTasks = this.#todoListModel.getTodoTasks();
    const todoListElement = this.#todoListView.createElement(todoTasks, {
      onUpdateTodoStatus: ({id, completed}) => {
        this.#handleUpdateTaskStatus({id, completed});
      },
      onDeleteTodo: ({id}) => {
        this.#handleTaskDelete({id});
      },
      onEditTodoName: ({ id, name }) => {
        this.#handleUpdateTaskName({id, name});
      }
    });
    render(todoListElement, todoListContainerElement);
    todoAllTaskCountElement.innerText = this.#todoListModel.getTotalCount();
    todoCompletedTaskCountElement.innerText = this.#todoListModel.getCompletedCount();
    todoUncompletedTaskCountElement.innerText = this.#todoListModel.getUncompletedCount();
  }

  initialize() {
    this.#handleChange();
  }

  mount() {
    this.#todoListModel.onChange(this.#handleChange);
    this.formElement.addEventListener("submit", this.#handleSubmit);
  }

  unmount() {
    this.#todoListModel.offChange(this.#handleChange);
    this.formElement.removeEventListener("submit", this.#handleSubmit);
  }
}
