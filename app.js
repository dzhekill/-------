const addButton = document.querySelector(".todo-add-button");
const text = document.querySelector(".todo-text");
const template = document.querySelector(".template").content;
const listItem = document.querySelector(".todo-list-item");
const newTemplate = template.querySelector(".todo-list-item");
const list = document.querySelector(".todo-list");
const items = list.children;
const typeButton = document.querySelector(".todo-type-button");


let typeOfTasks = {
  active: [],
  done: [],
  archive: [],
};

let taskMaker = function (texts) {
  let task = newTemplate.cloneNode(true);
  let taskText = task.querySelector(".todo-list-text");
  taskText.textContent = texts;
  archiveButtonListener(task);
  checkboxEventListener(task);
  backTaskButton(task);
  deleteTaskButton(task);
  list.appendChild(task);
  localStorage.setItem("arr", JSON.stringify(typeOfTasks));
};

let checkboxEventListener = function (task) {
  let checkbox = task.querySelector(".todo-list-input");
  let taskText = task.querySelector(".todo-list-text");
  checkbox.addEventListener("change", function () {
    if (checkbox.checked && typeButton.value === "active" && typeOfTasks.active.find(item => item == taskText.textContent) ) {
      typeOfTasks.done.push(taskText.textContent);
      typeOfTasks.active.splice(typeOfTasks.active.indexOf(taskText.textContent), 1);
    }
    if (!checkbox.checked && typeButton.value === "active") {
      typeOfTasks.active.push(taskText.textContent);
      typeOfTasks.done.splice(typeOfTasks.done.indexOf(taskText.textContent), 1);
    }
    if (!checkbox.checked && typeButton.value === "done" && typeOfTasks.done.find(item => item == taskText.textContent) ) {
      typeOfTasks.active.push(taskText.textContent);
      typeOfTasks.done.splice(typeOfTasks.done.indexOf(taskText.textContent), 1);
    }
  });
};

let archiveButtonListener = function (task) {
  let archiveButton = task.querySelector(".archive");
  archiveButton.addEventListener("click", function () {
    let taskText = task.querySelector(".todo-list-text");
    let checkbox = task.querySelector(".todo-list-input");
    if (checkbox.checked && typeButton.value === "active" && typeOfTasks.done.find(item => item == taskText.textContent)) {
      typeOfTasks.archive.push({ text: taskText.textContent, type: "active" });
      typeOfTasks.done.splice(typeOfTasks.done.indexOf(taskText.textContent), 1);
      task.remove();
    }
    if (typeButton.value === "active" && typeOfTasks.active.find(item => item == taskText.textContent)) {
      typeOfTasks.archive.push({ text: taskText.textContent, type: "active" });
      typeOfTasks.active.splice(typeOfTasks.active.indexOf(taskText.textContent), 1);
      task.remove();
    }
    if (typeButton.value === "done" && typeOfTasks.done.find(item => item == taskText.textContent)) {
      typeOfTasks.archive.push({ text: taskText.textContent, type: "done" });
      typeOfTasks.done.splice(typeOfTasks.done.indexOf(taskText.textContent), 1);
      task.remove();
    }
  });
};

let backTaskButton = function (task) {
  let activeButton = task.querySelector(".done");
  let taskText = task.querySelector(".todo-list-text");
  activeButton.addEventListener("click", function () {
      let oldDoing = typeOfTasks.archive.find(function(item){
        if(item.text === taskText.textContent) {
          if(item.type === 'active') {
            typeOfTasks.active.push(item.text);
          }
          if(item.type === 'done') {
            typeOfTasks.done.push(item.text);
          }
          task.remove()
          return true
        }
        return false
      })
      typeOfTasks.archive.splice(typeOfTasks.archive.indexOf(oldDoing), 1)
      localStorage.setItem("arr", JSON.stringify(typeOfTasks));
    }
  );
};


let deleteTaskButton = function (task) {
  let trashButton = task.querySelector(".trash");
  let taskText = task.querySelector(".todo-list-text");
  trashButton.addEventListener("click", function () {
    typeOfTasks.archive.splice(
      typeOfTasks.archive.indexOf(taskText.textContent),
      1
    );
    task.remove();
  });
};

typeButton.addEventListener("change", function () {
  list.innerHTML = "";
  if (typeButton.value === "active") {
    text.disabled = false;
    addButton.disabled = false;
    typeOfTasks.active.forEach((item) => {
      taskMaker(item);
    });
  }
  if (typeButton.value === "done") {
    text.disabled = true;
    addButton.disabled = true;
    typeOfTasks.done.forEach((item) => {
      taskMaker(item);
      let checkbox = document.querySelectorAll(".todo-list-input");
      checkbox.forEach((item) => (item.checked = true));
    });
  }
  if (typeButton.value === "archive") {
    text.disabled = true;
    addButton.disabled = true;
    typeOfTasks.archive.forEach((item) => {
      taskMaker(item.text);
      let checkbox = document.querySelectorAll(".todo-list-input");
      let activeButton = document.querySelectorAll(".done");
      let archiveButton = document.querySelectorAll(".archive");
      let trashButton = document.querySelectorAll(".trash");
      checkbox.forEach((item) => {
        item.checked = true;
        item.disabled = true;
      });
      activeButton.forEach((item) => {
        item.style.display = "inline-block";
      });
      archiveButton.forEach((item) => {
        item.style.display = "none";
      });
      trashButton.forEach((item) => {
        item.style.display = "inline-block";
      });
    });
  }
});

text.addEventListener("keypress", function (e) {
  if (e.keyCode == "13" && text.value !== "" && typeButton.value === "active") {
    typeOfTasks.active.push(text.value);
    taskMaker(text.value);
    text.value = "";
  }
});

addButton.addEventListener("click", function (e) {
  if (text.value !== "" && typeButton.value === "active") {
    typeOfTasks.active.push(text.value);
    taskMaker(text.value);
  }
  text.value = "";
});

window.onload = function(){
  let local = localStorage.getItem('arr');
  let parsed = JSON.parse(local);
  for(let key in parsed){
    parsed[key].forEach(item => typeOfTasks[key].push(item));
  }
  typeOfTasks.active.forEach(item => taskMaker(item));
}
