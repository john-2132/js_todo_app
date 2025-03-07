import { App } from "./src/App.js";

const formElement = document.querySelector("#js-form"); // フォーム自体
const formInputElement = document.querySelector("#js-form-input"); // フォームの入力欄
const todoAllTaskCountElement = document.querySelector("#js-all-task-count"); // 全タスクのカウント表示
const todoCompletedTaskCountElement = document.querySelector("#js-completed-task-count"); // 完了タスクのカウント表示
const todoUncompletedTaskCountElement = document.querySelector("#js-uncompleted-task-count"); // 未完了タスクのカウント表示
const todoListContainerElement = document.querySelector("#js-todo-list"); // タスクの表示先

const app = new App({
  formElement,
  formInputElement,
  todoAllTaskCountElement,
  todoCompletedTaskCountElement,
  todoUncompletedTaskCountElement,
  todoListContainerElement
});

window.addEventListener("load", () => {
  app.initialize();
  app.mount();
});

window.addEventListener("unload", () => {
  app.unmount();
});
