const addButton = document.querySelector(".button");
const inputValue = document.querySelector(".input_text");
const template = document.querySelector(".template").content;
const newTemplate = template.querySelector(".todo-list_item");
const list = document.querySelector(".todo-list");
const typeButton = document.querySelector(".selector");
const prompt = document.querySelector(".prompt");
const counter = document.querySelector('.counter');
let count = 1;

const sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

const ACTIVE_STATUS = 'active';
const DONE_STATUS = 'done';
const ARCHIVE_STATUS = 'archive';

let typeOfTasks = {
  active: [],
  done: [],
  archive: [],
};

let taskMaker = function (texts, id, status, isArchive) {
  let task = newTemplate.cloneNode(true);
  let taskText = task.querySelector(".todo-list_text");
  let checkbox = task.querySelector(".todo-list_checkbox");
  taskText.textContent = texts;
  task.id = id;
  task.dataset.status = isArchive ? ARCHIVE_STATUS : status;
  checkbox.disabled = isArchive
  if(status !== ACTIVE_STATUS) checkbox.checked = true
  archiveButtonListener(task);
  checkboxEventListener(task);
  backTaskButton(task);
  deleteTaskButton(task);
  list.appendChild(task);
  localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
};

let EmptyListMessage = function() {
  if(list.children.length === 0){
    prompt.textContent = 'Задачи выполнены, вы молодец'
    prompt.classList.remove('hidden');
    if(typeButton.value === ARCHIVE_STATUS){
    prompt.textContent = 'Нет архивных заданий'
    }
  }
  else {
    prompt.classList.add('hidden');
  }
  if(typeButton.value === ACTIVE_STATUS){
    counter.classList.remove('hidden');
    counter.textContent = `Осталось выполнить ${list.children.length} ${sklonenie(list.children.length, ['задание', 'задания', 'заданий'])}`;
  }
  else {
    counter.classList.add('hidden');
  }
}

let checkboxEventListener = function (task) {
  let checkbox = task.querySelector('.todo-list_checkbox');
  let text = task.querySelector(".todo-list_text");
  checkbox.addEventListener('click', function () {
    const status = task.dataset.status
    if (checkbox.checked) {
      typeOfTasks.done.push({ id: Number(task.id), text: text.textContent, status: DONE_STATUS});
      task.dataset.status = DONE_STATUS
    }
    else {
      typeOfTasks.active.push({ id: Number(task.id), text: text.textContent, status: ACTIVE_STATUS});
      task.dataset.status = ACTIVE_STATUS
    }
    typeOfTasks[status] = typeOfTasks[status].filter((item) => item.id !== Number(task.id));
    localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
  });
};

let archiveButtonListener = function (task) {
  let archiveButton = task.querySelector(".archive");
  let text = task.querySelector(".todo-list_text");
  archiveButton.addEventListener("click", function () {
    let status = task.dataset.status;
    typeOfTasks[ARCHIVE_STATUS].push({text : text.textContent, id : Number(task.id), status: status});
    typeOfTasks[status] =  typeOfTasks[status].filter((item) => item.id !== Number(task.id))
    task.remove();
    localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
    EmptyListMessage();
  });
};

let backTaskButton = function (task) {
  let activeButton = task.querySelector(".done");
  activeButton.addEventListener("click", function () {
    const item = typeOfTasks.archive.find(function (item) {
      return item.id === Number(task.id)
    });
    typeOfTasks[item.status].push(item);
    task.remove();
    typeOfTasks.archive = typeOfTasks.archive.filter((item) => item.id !== Number(task.id));
    localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
    EmptyListMessage()
 });
};

let deleteTaskButton = function (task) {
  let trashButton = task.querySelector(".trash");
  trashButton.addEventListener("click", function () {
      typeOfTasks.archive = typeOfTasks.archive.filter((item) => item.id !== Number(task.id))
      task.remove();
      localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
      EmptyListMessage();
  })
};

typeButton.addEventListener("change", function (event) {
  list.innerHTML = "";
  const status = event.target.value
  const isArchive = status === ARCHIVE_STATUS
  inputValue.disabled = status !== ACTIVE_STATUS;
  addButton.disabled = status !== ACTIVE_STATUS;
  typeOfTasks[status].sort((a, b) => a.id-b.id).forEach((item) => {
    taskMaker(item.text, item.id, item.status, isArchive);
  });
  EmptyListMessage()
});


let addHandler = function(){
  typeOfTasks.active.push({ text: inputValue.value, id: count, status: ACTIVE_STATUS});
    taskMaker(inputValue.value, count, ACTIVE_STATUS);
    inputValue.value = "";
    count++;
    EmptyListMessage()
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
  EmptyListMessage();
}