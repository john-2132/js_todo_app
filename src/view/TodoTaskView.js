import { element } from "./html-utils.js";

export class TodoTaskView {
  createElement(todoTask, { onUpdateTodoStatus, onDeleteTodo, onEditTodoName }) {
    const todoTaskElement = element`
      <li style="display: flex; align-items: center;">
        <input type="checkbox" class="checkbox" ${todoTask.completed ? "checked" : ""}>
        <span style="flex: auto;">${todoTask.name}</span>
        <input type="text" value="${todoTask.name}" class="edit-todo" style="display: none; flex: auto;">
        <div class="action-button">
          <button class="edit" style="margin-left: 3px;">編集</button>
          <button class="save" style="display: none; margin-left: 3px;">保存</button>
          <button class="delete" style="margin-left: 3px;">削除</button>
        </div>
      </li>
    `

    const inputCheckboxElement = todoTaskElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodoStatus({
        id: todoTask.id,
        completed: !todoTask.completed
      });
    });

    const deleteButtonElement = todoTaskElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      if (confirm('本当に削除してもよろしいですか？')) {
        onDeleteTodo({
          id: todoTask.id
        });
      }
    });

    const spanElement = todoTaskElement.querySelector("span");
    const inputTextElement = todoTaskElement.querySelector("input[type=text]");
    const editButtonElement = todoTaskElement.querySelector(".edit");
    const saveButtonElement = todoTaskElement.querySelector(".save");

    editButtonElement.addEventListener("click", () => {
      spanElement.style.display = "none";
      inputTextElement.style.display = "inline";
      editButtonElement.style.display = "none";
      saveButtonElement.style.display = "inline";

      inputTextElement.focus();
    });

    const saveEdit = () => {
      const newName = inputTextElement.value.trim();
      if (newName && newName !== todoTask.name) {
        onEditTodoName({
          id: todoTask.id,
          name: newName
        });
      }
      spanElement.textContent = newName;
      spanElement.style.display = "inline";
      inputTextElement.style.display = "none";
      editButtonElement.style.display = "inline";
      saveButtonElement.style.display = "none";
    };

    inputTextElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            saveEdit();
        } else if (event.key === "Escape") {
            inputTextElement.value = todoTask.name;
            spanElement.style.display = "inline";
            inputTextElement.style.display = "none";
            editButtonElement.style.display = "inline";
            saveButtonElement.style.display = "none";
        }
    });

    saveButtonElement.addEventListener('click', saveEdit);

    return todoTaskElement;
  }
}
