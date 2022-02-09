const addButton = document.querySelector(".todo-add_button");
const inputValue = document.querySelector(".todo-input_text");
const template = document.querySelector(".template").content;
const newTemplate = template.querySelector(".todo-list_item");
const list = document.querySelector(".todo-list");
const typeButton = document.querySelector(".todo-type_button");
let count = 1;


let typeOfTasks = {
  active: [],
  done: [],
  archive: [],
};

let taskMaker = function (texts, id) {
  let task = newTemplate.cloneNode(true);
  let taskText = task.querySelector(".todo-list_text");
  taskText.textContent = texts;
  task.id = id;
  archiveButtonListener(task);
  checkboxEventListener(task);
  backTaskButton(task);
  deleteTaskButton(task);
  list.appendChild(task);
  localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));

};

let checkboxEventListener = function (task) {
  let checkbox = task.querySelector(".todo-list_checkbox");
  checkbox.addEventListener("click", function () {
    typeOfTasks.active.forEach(function (item) {
      if (checkbox.checked && item.id === Number(task.id)) {
        typeOfTasks.done.push(item);
        typeOfTasks.active.splice(typeOfTasks.active.indexOf(item), 1);
        localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks))
        console.log(typeOfTasks)
      }
    });
    typeOfTasks.done.forEach(function (item) {
      if (!checkbox.checked && item.id === Number(task.id)) {
        if (typeButton.value === "active") {
          typeOfTasks.active.push(item);
          typeOfTasks.done.splice(typeOfTasks.done.indexOf(item), 1);
          localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
          console.log(typeOfTasks)
        }
        if (typeButton.value === "done") {
          typeOfTasks.active.push(item);
          typeOfTasks.done.splice(typeOfTasks.done.indexOf(item), 1);
          localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
          console.log(typeOfTasks)
        }
      }
    });
  });
};

let archiveButtonListener = function (task) {
  let archiveButton = task.querySelector(".archive");
  let checkbox = task.querySelector(".todo-list_checkbox");
  archiveButton.addEventListener("click", function () {
    if (typeButton.value === "active") {
      typeOfTasks.active.forEach(function (item) {
        if (item.id === Number(task.id)) {
          typeOfTasks.archive.push({text : item.text, id : item.id, type: 'active'});
          typeOfTasks.active.splice(typeOfTasks.active.indexOf(item), 1);
          task.remove();
          localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
        }
        if(checkbox.checked){
          typeOfTasks.done.forEach(function(item) {
            if (item.id === Number(task.id)) {
              typeOfTasks.archive.push({text : item.text, id : item.id, type: 'done'});
              typeOfTasks.done.splice(typeOfTasks.done.indexOf(item), 1);
              task.remove();
              localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
          }
        })
        }

      });
    }
    if(typeButton.value === "done") {
      typeOfTasks.done.forEach(function (item) {
        if (item.id === Number(task.id)) {
          typeOfTasks.archive.push({text : item.text, id : item.id, type: 'done'});
          typeOfTasks.done.splice(typeOfTasks.done.indexOf(item), 1);
          task.remove();
          localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
        }
      });
    }
  });
};

let backTaskButton = function (task) {
  let activeButton = task.querySelector(".done");
  activeButton.addEventListener("click", function () {
    let oldDoing = typeOfTasks.archive.find(function (item) {
      if (item.id === Number(task.id)) {
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
    localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
  });
};

let deleteTaskButton = function (task) {
  let trashButton = task.querySelector(".trash");
  trashButton.addEventListener("click", function () {
    typeOfTasks.archive.forEach(function(item) {
      if(item.id === Number(task.id)){
        typeOfTasks.archive.splice(typeOfTasks.archive.indexOf(item), 1);
        task.remove();
        localStorage.setItem("arrayOfTask", JSON.stringify(typeOfTasks));
      }
    })
  });
};

typeButton.addEventListener("change", function () {
  list.innerHTML = "";
  if (typeButton.value === "active") {
    inputValue.disabled = false;
    addButton.disabled = false;
    typeOfTasks.active.forEach((item) => {
      taskMaker(item.text, item.id);
    });
  }
  if (typeButton.value === "done") {
    inputValue.disabled = true;
    addButton.disabled = true;
    typeOfTasks.done.forEach((item) => {
      taskMaker(item.text, item.id);
      let checkbox = document.querySelectorAll(".todo-list_checkbox");
      checkbox.forEach((item) => (item.checked = true));
    });
  }
  if (typeButton.value === "archive") {
    inputValue.disabled = true;
    addButton.disabled = true;
    typeOfTasks.archive.forEach((item) => {
      taskMaker(item.text, item.id);
      let checkbox = document.querySelectorAll(".todo-list_checkbox");
      let activeButton = document.querySelectorAll(".done");
      let archiveButton = document.querySelectorAll(".archive");
      let trashButton = document.querySelectorAll(".trash");
      if(item.type === 'done'){
        checkbox.forEach((item) =>{
          item.checked = true;
        })
      }
      checkbox.forEach((item) => {
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
let addHandler = function(){
  typeOfTasks.active.push({ text: inputValue.value, id: count });
    taskMaker(inputValue.value, count);
    inputValue.value = "";
    count++;
}

inputValue.addEventListener("keypress", function (e) {
  if (e.keyCode == "13" && inputValue.value !== "" && typeButton.value === "active") {
    addHandler();
  }
});

addButton.addEventListener("click", function (e) {
  if (inputValue.value !== "" && typeButton.value === "active") {
    addHandler();
  }
  
});



window.onload = function(){
  let storageData = localStorage.getItem('arrayOfTask');
  let parsedData = JSON.parse(storageData);
  for(let key in parsedData){
    parsedData[key].forEach(item => typeOfTasks[key].push(item));
  }
  typeOfTasks.active.forEach(item => taskMaker(item.text, item.id));
}