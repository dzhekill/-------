const addButton = document.querySelector(".button");
const inputValue = document.querySelector(".input_text");
const template = document.querySelector(".template").content;
const newTemplate = template.querySelector(".todo-list_item");
const list = document.querySelector(".todo-list");
const typeButton = document.querySelector(".selector");
let count = 1;


const ACTIVE_STATUS = 'active';
const DONE_STATUS = 'done';
const ARCHIVE_STATUS = 'archive';

let typeOfTasks = {
  active: [],
  done: [],
  archive: [],
};



let taskMaker = function (texts, id, status) {
  let task = newTemplate.cloneNode(true);
  let taskText = task.querySelector(".todo-list_text");
  taskText.textContent = texts;
  task.id = id;
  task.dataset.status = status;
  archiveButtonListener(task);
  checkboxEventListener(task);
  backTaskButton(task);
  deleteTaskButton(task);
  list.appendChild(task);
  localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));

};

let checkboxEventListener = function (task) {
  let checkbox = task.querySelector('.todo-list_checkbox');
  let text = task.querySelector(".todo-list_text");
  checkbox.addEventListener('click', function () {
    if (checkbox.checked) {
      typeOfTasks.done.push({ id: Number(task.id), text: text.textContent, status: DONE_STATUS});
      typeOfTasks.active = typeOfTasks.active.filter((item) => item.id !== Number(task.id));
      task.dataset.status = DONE_STATUS
    }
    else {
      typeOfTasks.active.push({ id: Number(task.id), text: text.textContent, status: ACTIVE_STATUS});
      typeOfTasks.done = typeOfTasks.done.filter((item) => item.id !== Number(task.id));
    }
    localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
  });
};

let archiveButtonListener = function (task) {
  let archiveButton = task.querySelector(".archive");
  let text = task.querySelector(".todo-list_text");
  archiveButton.addEventListener("click", function () {
    let status = task.dataset.status;
    typeOfTasks.archive.push({text : text.textContent, id : Number(task.id), status: status});
    typeOfTasks[status] =  typeOfTasks[status].filter((item) => item.id !== Number(task.id))
    task.remove();
    localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
  });
};

let backTaskButton = function (task) {
  let activeButton = task.querySelector(".done");
  activeButton.addEventListener("click", function () {
    let oldDoing = typeOfTasks.archive.find(function (item) {
      if (item.id === Number(task.id)) {
        if (item.status === "active") {
          typeOfTasks.active.push({text : item.text, id :item.id, status:ACTIVE_STATUS});
        }
        if (item.status === "done") {
          typeOfTasks.done.push({text : item.text, id :item.id, status:DONE_STATUS});
        }
        task.remove();
        return true;
      }
      return false;
    });
    typeOfTasks.archive.splice(typeOfTasks.archive.indexOf(oldDoing.id), 1);
    localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
  });
};

let deleteTaskButton = function (task) {
  let trashButton = task.querySelector(".trash");
  trashButton.addEventListener("click", function () {
        typeOfTasks.archive = typeOfTasks.archive.filter((item) => item.id !== Number(task.id))
        task.remove();
        localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
  })
};

typeButton.addEventListener("change", function () {
  list.innerHTML = "";
  if (typeButton.value === "active") {
    inputValue.disabled = false;
    addButton.disabled = false;
    typeOfTasks.active.forEach((item) => {
      taskMaker(item.text, item.id, item.status);
    });
  }
  if (typeButton.value === "done") {
    inputValue.disabled = true;
    addButton.disabled = true;
    typeOfTasks.done.forEach((item) => {
      taskMaker(item.text, item.id, item.status);
      let checkbox = document.querySelectorAll(".todo-list_checkbox");
      checkbox.forEach((item) => (item.checked = true));
    });
  }
  if (typeButton.value === "archive") {
    inputValue.disabled = true;
    addButton.disabled = true;
    typeOfTasks.archive.forEach((item) => {
      taskMaker(item.text, item.id, ARCHIVE_STATUS);
      let checkbox = document.querySelectorAll(".todo-list_checkbox");
      checkbox.forEach((item) => item.disabled = true)
      if(item.status === DONE_STATUS){
        let checkbox = document.querySelectorAll(".todo-list_checkbox");
        checkbox.forEach((item) => item.checked = true)
      }
      });
  }
});

let addHandler = function(){
  typeOfTasks.active.push({ text: inputValue.value, id: count });
    taskMaker(inputValue.value, count, ACTIVE_STATUS);
    inputValue.value = "";
    count++;
}

inputValue.addEventListener("keypress", function (e) {
  if (e.keyCode == "13" && inputValue.value !== "" && typeButton.value === "active") {
    addHandler();
  }
});

addButton.addEventListener("click", function () {
  if (inputValue.value !== "" && typeButton.value === "active") {
    addHandler();
  }
  
});

window.onload = function(){
  let storageData = localStorage.getItem('arrayOfTask');
  typeOfTasks = JSON.parse(storageData) || typeOfTasks;
  typeOfTasks.active.forEach(item => taskMaker(item.text, item.id, item.status));
}