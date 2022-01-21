const addButton = document.querySelector(".todo-add-button");
const text = document.querySelector(".todo-text");
const template = document.querySelector(".template").content;
const list = document.querySelector(".todo-list");
const items = list.children;
const checkbox = document.querySelector('.todo-list-input');
console.log(template);

addButton.addEventListener("click", function () {
    let task = template.cloneNode(true);
    let taskText = task.querySelector(".todo-list-text");
    taskText.textContent = text.value;
    list.appendChild(task);
    
});
checkbox.addEventListener("change",  function(evt) {
    evt.target.parentNode.remove();
})