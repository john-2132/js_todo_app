export class TodoTaskModel {
  /** @type {number} TodoタスクのID */
  id;
  /** @type {string} Todoタスクの名前 */
  name;
  /** @type {boolean} Todoタスクが完了済みならばtrue、そうでない場合はfalse */
  completed;

  /**
   * @type {number} 管理用通し番号
   */
  static todoIndex = 0;

  /**
   * @param {Object} params - Todoタスクモデルパラメータ
   * @param {string} params.name - Todoタスク名
   * @param {boolean} params.completed - Todoタスク状態
   */
  constructor({ name, completed }) {
    this.id = TodoTaskModel.todoIndex++;
    this.name = name;
    this.completed = completed;
  }


  /**
   * タイトルが空文字列の場合にtrueを返す
   * @returns {boolean}
   */
  isEmptyName() {
    return this.name.length === 0;
  }
}
