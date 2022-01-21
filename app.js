const addButton = document.querySelector(".todo-add-button");
const text = document.querySelector(".todo-text");
const template = document.querySelector(".template").content;
const listItem = document.querySelector('.todo-list-item');
const newTemplate = template.querySelector('.todo-list-item');
const list = document.querySelector(".todo-list");
const items = list.children;




let addChange = function(item) {
    const checkbox = item.querySelector(".todo-list-input");
    checkbox.addEventListener("change", function (evt) {
        //  evt.target.parentNode.parentNode.remove();
        console.log(evt.target.querySelector('.todo-list-item'));
        item.remove();
      });
}

addChange(listItem);
addButton.addEventListener("click", function () {
  let task = newTemplate.cloneNode(true);
  let taskText = task.querySelector(".todo-list-text");
  taskText.textContent = text.value;
  addChange(task);
  list.appendChild(task);
});
