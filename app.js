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
  notFullyDone: [],
  done: ["Какаято лютая хуйня 3", "asdfaseh"],
  archive: [
    { text: "Какаято лютая хуйня 1", type: "done" },
    { text: "Какаято лютая хуйня 2", type: "done" },
    { text: "Какаято лютая хуйня 3", type: "done" },
  ],
};

let taskMaker = function (texts) {
  let task = newTemplate.cloneNode(true);
  let taskText = task.querySelector(".todo-list-text");
  taskText.textContent = texts;
  archiveButtonListener(task);
  list.appendChild(task);
};

let archiveButtonListener = function (task) {
  let archiveButton = task.querySelector(".archive");
  let checkbox = task.querySelector(".todo-list-input");
  let taskText = task.querySelector(".todo-list-text");
  if(checkbox.checked) {
    typeOfTasks.done.push(taskText.textContent);
    typeOfTasks.active.splice(typeOfTasks.active.indexOf(taskText.textContent),1);
    console.log(typeOfTasks);
  }
  archiveButton.addEventListener("click", function (e) {
    
    
    
    // if (checkbox.checked && typeButton.value === "active") {
    //   typeOfTasks.archive.push({ text: taskText.textContent, type: "active" });
    //   typeOfTasks.active.splice(typeOfTasks.active.indexOf(taskText.textContent),1);
    //   console.log(typeOfTasks);
    // }
    // if (checkbox.checked && typeButton.value === "done") {
    //   typeOfTasks.archive.push({ text: taskText.textContent, type: "done" });
    //   typeOfTasks.done.splice(typeOfTasks.done.indexOf(taskText.textContent),1);
    //   console.log(typeOfTasks);
    // }
  });
};

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
    });
  }
  if (typeButton.value === "archive") {
    typeOfTasks.archive.forEach((item) => {
      taskMaker(item.text);
      let activeButton = document.querySelectorAll(".done");
      activeButton.forEach((item => {item.style.display= 'inline-block';}))
    });
  }
});

addButton.addEventListener("click", function () {
  if (text.value !== "") {
    taskMaker(text.value);
    typeOfTasks.active.push(text.value);
  }
  text.value = "";
});

// let addChange = function(item) {
//     const checkbox = item.querySelector(".todo-list-input");
//     checkbox.addEventListener("change", function (evt) {
//         //  evt.target.parentNode.parentNode.remove();
//         console.log(evt.target.querySelector('.todo-list-item'));
//         item.remove();
//       });
// }
// addChange(listItem);
