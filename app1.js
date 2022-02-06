const addButton = document.querySelector(".todo-add-button");
const text = document.querySelector(".todo-text");
const template = document.querySelector(".template").content;
const listItem = document.querySelector(".todo-list-item");
const newTemplate = template.querySelector(".todo-list-item");
const list = document.querySelector(".todo-list");
const typeButton = document.querySelector(".todo-type-button");
let count = 1;

let typeOfTasks = {
  active: [],
  done: [],
  archive: [],
};

let taskMaker = function (texts, id) {
  let task = newTemplate.cloneNode(true);
  let taskText = task.querySelector(".todo-list-text");
  taskText.textContent = texts;
  task.id = id;
  archiveButtonListener(task);
  checkboxEventListener(task);
  backTaskButton(task);
  deleteTaskButton(task);
  list.appendChild(task);
  localStorage.setItem("arr", JSON.stringify(typeOfTasks));
};

let checkboxEventListener = function (task) {
  let checkbox = task.querySelector(".todo-list-input");
  checkbox.addEventListener("click", function () {
    typeOfTasks.active.forEach(function (item) {
      if (checkbox.checked && item.id === Number(task.id)) {
        typeOfTasks.done.push(item);
        typeOfTasks.active.splice(typeOfTasks.active.indexOf(item), 1);
      }
    });
    typeOfTasks.done.forEach(function (item) {
      if (!checkbox.checked && item.id === Number(task.id)) {
        if (typeButton.value === "active") {
          typeOfTasks.active.push(item);
          typeOfTasks.done.splice(typeOfTasks.done.indexOf(item), 1);
        }
        if (typeButton.value === "done") {
          typeOfTasks.active.push(item);
          typeOfTasks.done.splice(typeOfTasks.done.indexOf(item), 1);
        }
      }
    });
  });
};

let archiveButtonListener = function (task) {
  let archiveButton = task.querySelector(".archive");
  archiveButton.addEventListener("click", function () {
    if (typeOfTasks.value = "active") {
      typeOfTasks.active.forEach(function (item) {
        if (item.id == task.id) {
          typeOfTasks.archive.push({text : item.text, id : item.id, type: 'active'});
          typeOfTasks.active.splice(typeOfTasks.active.indexOf(item), 1);
          task.remove();
          console.log(typeOfTasks)
        }
      });
    }
    if(typeOfTasks.value = "done") {
      typeOfTasks.done.forEach(function (item) {
        if (item.id == task.id) {
          typeOfTasks.archive.push({text : item.text, id : item.id, type: 'done'});
          typeOfTasks.done.splice(typeOfTasks.done.indexOf(item), 1);
          task.remove();
          console.log(typeOfTasks)
        }
      });
    }
  });
};

let backTaskButton = function (task) {
  let activeButton = task.querySelector(".done");
  activeButton.addEventListener("click", function () {
    let oldDoing = typeOfTasks.archive.find(function (item) {
      if (item.id == task.id) {
        if (item.type === "active") {
          typeOfTasks.active.push({text : item.text, id :item.id});
        }
        if (item.type === "done") {
          typeOfTasks.done.push({text : item.text, id :item.id});
        }
        task.remove();
        return true;
      }
      return false;
    });
    typeOfTasks.archive.splice(typeOfTasks.archive.indexOf(oldDoing), 1);
    localStorage.setItem("arr", JSON.stringify(typeOfTasks));
  });
};

let deleteTaskButton = function (task) {
  let trashButton = task.querySelector(".trash");
  trashButton.addEventListener("click", function () {
    typeOfTasks.archive.splice(typeOfTasks.archive.indexOf(taskText.textContent),1);
    task.remove();
  });
};

typeButton.addEventListener("change", function () {
  list.innerHTML = "";
  if (typeButton.value === "active") {
    text.disabled = false;
    addButton.disabled = false;
    typeOfTasks.active.forEach((item) => {
      taskMaker(item.text, item.id);
    });
  }
  if (typeButton.value === "done") {
    text.disabled = true;
    addButton.disabled = true;
    typeOfTasks.done.forEach((item) => {
      taskMaker(item.text, item.id);
      let checkbox = document.querySelectorAll(".todo-list-input");
      checkbox.forEach((item) => (item.checked = true));
    });
  }
  if (typeButton.value === "archive") {
    text.disabled = true;
    addButton.disabled = true;
    typeOfTasks.archive.forEach((item) => {
      taskMaker(item.text, item.id);
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
    typeOfTasks.active.push({ text: text.value, id: count });
    taskMaker(text.value, count);
    text.value = "";
    count++;
  }
});

addButton.addEventListener("click", function (e) {
  if (text.value !== "" && typeButton.value === "active") {
    typeOfTasks.active.push({ text: text.value, id: count });
    taskMaker(text.value, count);
    count++;
  }
  text.value = "";
});

window.onload = function(){
  let local = localStorage.getItem('arr');
  let parsed = JSON.parse(local);
  for(let key in parsed){
    parsed[key].forEach(item => typeOfTasks[key].push(item));
    console.log(typeOfTasks)
  }
  typeOfTasks.active.forEach(item => taskMaker(item.text, item.id));
  console.log(typeOfTasks)
}