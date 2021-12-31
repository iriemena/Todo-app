const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// get from local storage
const todoEl = JSON.parse(localStorage.getItem("Todo")) || [];

if (todoEl) {
  todoEl.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
  addToLocal();
});

function addTodo(todo) {
  const li = document.createElement("li");
  let todoEl = input.value;

  if (ul == "") {
    alert("empty");
  }

  // completed todo
  if (todo && todo.completed) {
    li.classList.add("completed");
  }

  //   if todo from local storage is available
  if (todo) {
    todoEl = todo.text;
  }

  //   if todo from local storage is not available then create todo below
  if (todoEl) {
    li.innerHTML = `
  <input type="checkbox" class="input-check" ${
    li.classList.contains("completed") ? "checked" : ""
  }/>
          <label>${todoEl}</label>
          <button class="btn-close"><i class="fas fa-times"></i></button>
  `;
    ul.appendChild(li);

    input.value = "";

    const check = li.querySelector(".input-check");
    const close = li.querySelector(".btn-close");

    check.addEventListener("click", (e) => {
      li.classList.toggle("completed");

      addToLocal();
    });

    close.addEventListener("click", () => {
      li.remove();
      deleteTodo(todoEl);
      addToLocal();
    });
  } else {
    return;
  }
}

function addToLocal() {
  const li = document.querySelectorAll("li");
  const todos = [];

  li.forEach((todo) => {
    todos.push({
      text: todo.innerText,
      completed: todo.classList.contains("completed"),
    });
  });
  localStorage.setItem("Todo", JSON.stringify(todos));
}

function deleteTodo(item) {
  const todos = JSON.parse(localStorage.getItem("Todo"));

  localStorage.setItem(
    "Todo",
    JSON.stringify(todos.filter((todo) => todo.text !== item))
  );
}
