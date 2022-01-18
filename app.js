const add_button = document.querySelector("#add_button");
const text = document.querySelector(".text");
const shablon = document.getElementById('shablon');
const newTask = shablon.querySelector('.task');
add_button.addEventListener("click", function () {
    
    let task = newTask.cloneNode(true);
    console.log(task);
});
