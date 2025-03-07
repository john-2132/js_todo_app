import { EventEmitter } from "../EventEmitter.js";
import { TodoTaskModel } from "./TodoTaskModel.js";

export class TodoListModel extends EventEmitter {
  #tasks;

  /**
   * Todoタスクのリストを生成
   * @param {Array} tasks Todoタスク情報
   */
  constructor(tasks = []) {
    super();
    const stored_todo_list = localStorage.getItem('todo-list');
    this.#tasks = stored_todo_list ? JSON.parse(stored_todo_list).map(task => new TodoTaskModel({ name: task.name, completed: task.completed })) : tasks;
  }

  /**
   * Todoリストの持つタスク総数を取得
   * @returns {number} Todoタスク総数
   */
  getTotalCount() {
    return this.#tasks.length;
  }

  getCompletedCount() {
    return this.#tasks.filter(todo => todo.completed).length;
  }

  getUncompletedCount() {
    return this.#tasks.filter(todo => !todo.completed).length;
  }

  getTodoTasks() {
    return this.#tasks;
  }

  /**
   * Changeイベントリスナーへの追加
   * @param {Function} listener イベント時の処理
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  /**
   * Changeイベントリスナーから削除
   * @param {Function} listener 対象の処理
   */
  offChange(listener) {
    this.removeEventListener("change", listener);
  }

  /**
   * changeイベントの発行
   */
  emitChange() {
    this.emit("change");
  }

  /**
   * Todoリストをローカルストレージへ保存
   */
  saveTodoList() {
    localStorage.setItem('todo-list', JSON.stringify(this.#tasks));
  }

  /**
   * Todoタスクの追加
   * @param {TodoTaskModel} todoTask Todoタスク
   */
  addTask(todoTask) {
    if (todoTask.isEmptyName()) {
      return;
    }
    this.#tasks.push(todoTask);
    this.emitChange();
    this.saveTodoList();
  }

  /**
   * Todoタスクの名前更新
   * @param {Object} params - 更新対象のパラメータ
   * @param {number} params.id - 更新するTodoタスクのID
   * @param {string} params.name - 更新後のタスク名
   */
  updateTaskName({ id, name }) {
    const todoTask = this.#tasks.find(todo => todo.id === id);
    if (name.length === 0) return;
    if (todoTask) {
      todoTask.name = name;
      this.emitChange();
      this.saveTodoList();
    }
  }

  /**
   * Todoタスクの状態更新
   * @param {Object} params - 更新対象のパラメータ
   * @param {number} params.id - 更新するTodoタスクのID
   * @param {boolean} params.completed - 更新後の完了状態
   */
  updateTaskStatus({ id, completed }) {
    const todoTask = this.#tasks.find(todo => todo.id === id);
    if (todoTask) {
      todoTask.completed = completed;
      this.emitChange();
      this.saveTodoList();
    }
  }

  /**
   * 指定のTodoタスクをTodoリストから削除
   * @param {number} 削除するTodoタスクのID
   */
  deleteTask({ id }) {
    this.#tasks = this.#tasks.filter(todo => {
      return todo.id != id;
    });

    this.emitChange();
    this.saveTodoList();
  }
}
