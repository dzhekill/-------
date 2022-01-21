const add_button = document.querySelector("#add_button");
const text = document.querySelector(".text");
const shablon = document.getElementById('shablon');
console.log(shablon);
const items = document.querySelector(".toDo-list").children;
const checkbox = document.querySelector('.todo-list-input');
add_button.addEventListener("click", function () {
    let task = shablon.cloneNode(true);
    console.log(task.querySelector('span'));
    
});
checkbox.addEventListener("change",  function(evt) {
    evt.target.parentNode.remove();
})