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
  localStorage.setItem('arr', JSON.stringify(typeOfTasks))
};



let checkboxEventListener = function (task) {
  let checkbox = task.querySelector(".todo-list-input");
  let taskText = task.querySelector(".todo-list-text");
  checkbox.addEventListener("click", function () {
    if (checkbox.checked && typeButton.value === "active") {
      typeOfTasks.done.push(taskText.textContent);
      typeOfTasks.active.splice(typeOfTasks.active.indexOf(taskText.textContent),1);
    }
  });
};

let archiveButtonListener = function (task) {
  let archiveButton = task.querySelector(".archive");
  archiveButton.addEventListener("click", function (e) {
    let checkbox = task.querySelector(".todo-list-input");
    let taskText = task.querySelector(".todo-list-text");
    if (checkbox.checked && typeButton.value === "active") {
      typeOfTasks.archive.push({ text: taskText.textContent, type: "active" });
      typeOfTasks.done.splice(typeOfTasks.done.indexOf(taskText.textContent),1);
    }
    if (checkbox.checked && typeButton.value === "done") {
      typeOfTasks.archive.push({ text: taskText.textContent, type: "done" });
      typeOfTasks.done.splice(typeOfTasks.done.indexOf(taskText.textContent),1);
    }
  });
};

let backTaskButton = function(task){
  let activeButton = task.querySelector(".done");
  let taskText = task.querySelector(".todo-list-text");
  activeButton.addEventListener('click', function(){
      if(typeOfTasks.archive.find(item => item.text == taskText.textContent).type === 'done'){
        typeOfTasks.done.push(taskText.textContent);
        typeOfTasks.archive.splice(typeOfTasks.archive.indexOf(taskText.textContent),1)
      }
      if(typeOfTasks.archive.find(item => item.text == taskText.textContent).type === 'active'){
        typeOfTasks.active.push(taskText.textContent);
        typeOfTasks.archive.splice(typeOfTasks.archive.indexOf(taskText.textContent),1)
      }
    })
  };

let deleteTaskButton = function(task){
  let trashButton = task.querySelector(".trash");
  let taskText = task.querySelector(".todo-list-text");
   trashButton.addEventListener('click', function(){
    typeOfTasks.archive.splice(typeOfTasks.archive.indexOf(taskText.textContent),1)
    task.remove();
   })
}

typeButton.addEventListener("change", function () {
  list.innerHTML = "";
  if (typeButton.value === "active") {
    typeOfTasks.active.forEach((item) => {
      taskMaker(item);
    });
  }
  if (typeButton.value === "done") {
    typeOfTasks.done.forEach((item) => {
      taskMaker(item);
      let checkbox = document.querySelectorAll(".todo-list-input");
      checkbox.forEach((item) => item.checked = true)
    });
  }
  if (typeButton.value === "archive") {
    typeOfTasks.archive.forEach((item) => {
      taskMaker(item.text);
      let checkbox = document.querySelectorAll(".todo-list-input");
      let activeButton = document.querySelectorAll(".done");
      let archiveButton = document.querySelectorAll(".archive");
      let trashButton = document.querySelectorAll(".trash");
      checkbox.forEach((item) => item.checked = true)
      activeButton.forEach((item) => {
        item.style.display = "inline-block";
      });
      archiveButton.forEach((item) =>{
        item.style.display = 'none';
      })
      trashButton.forEach((item) => {
        item.style.display = "inline-block";
      });
    });
  }
});

addButton.addEventListener("click", function () {
  if (text.value !== "" && typeButton.value === "active") {
    taskMaker(text.value);
    typeOfTasks.active.push(text.value);
    localStorage.setItem('arr', JSON.stringify(typeOfTasks))
  }
  text.value = "";
});

window.onload = function(){
  let local = localStorage.getItem('arr');
  let parsed = JSON.parse(local);
  console.log(parsed)
  for(let key in parsed){
    console.log(parsed[key]);
    console.log(key);
    parsed[key].forEach(item => typeOfTasks[key].push(item));
  }
  typeOfTasks.active.forEach(item => taskMaker(item));
}