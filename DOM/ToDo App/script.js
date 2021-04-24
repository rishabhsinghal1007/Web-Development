let input = document.querySelector(".task-input");
let ul = document.querySelector(".task-list");

function deleteTask(e) {
  e.currentTarget.remove();
}

function addItem(e) {
  if (e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "Enter") {
    let task = input.value;
    if (!task) {
      alert("Error-Adding Empty task");
      return;
    }
    input.value = "";

    let li = document.createElement("li");
    li.innerText = task;
    li.addEventListener("dblclick", deleteTask);
    if (e.key == "ArrowUp") {
      ul.insertBefore(li, ul.firstChild);
    } else {
      ul.appendChild(li);
    }
  }
}

input.addEventListener("keyup", addItem);
