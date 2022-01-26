const addButton = document.querySelector(".todo-add-button");
const text = document.querySelector(".todo-text");
const template = document.querySelector(".template").content;
const listItem = document.querySelector(".todo-list-item");
const newTemplate = template.querySelector(".todo-list-item");
const list = document.querySelector(".todo-list");
const items = list.children;
const typeButton = document.querySelector(".todo-type-button");

const archiveButton = list.querySelector(".archive");

let typeOfTask = [
  { text: "Какаято лютая хуйня", type: "done" },
  { text: "Какаято лютая хуйня", type: "done" },
  { text: "Какаято лютая хуйня", type: "done" },
];

let taskMaker = function (texts) {
  let task = newTemplate.cloneNode(true);
  let taskText = task.querySelector(".todo-list-text");
  taskText.textContent = texts;
  list.appendChild(task);
};

let doneButtonListener = function () {
  let doneButton = document.querySelector(".done");
  doneButton.addEventListener("click", function (evt) {
    let checkbox = document.querySelector(".todo-list-input");
    console.log(checkbox);
    if (checkbox.checked) {
      // this.taskMaker.type = 'done';
      
    }
  });
};
doneButtonListener();
typeButton.addEventListener("change", function () {
  list.innerHTML = "";
  if (typeButton.value === "active") {
    for (let i = 0; i < typeOfTask.length; i++) {
      if (typeOfTask[i].type === "active") {
        taskMaker(typeOfTask[i].text);
      }
    }
  }
  if (typeButton.value === "done") {
    for (let i = 0; i < typeOfTask.length; i++) {
      if (typeOfTask[i].type === "done") {
        taskMaker(typeOfTask[i].text);
      }
    }
  }
  if (typeButton.value === "archive") {
    for (let i = 0; i < typeOfTask.length; i++) {
      if (typeOfTask[i].type === "archive") {
        taskMaker(typeOfTask[i].text);
      }
    }
  }
});

addButton.addEventListener("click", function () {
  if (text.value !== "") {
    
    taskMaker(text.value);
    doneButtonListener();
    typeOfTask.push({ text: text.value, type: "active" });
  }
  //   addChange(task);
  console.log(typeOfTask);
  text.value = "";
});

archiveButton.addEventListener("click", function () {
  console.log("asdfasd");
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
