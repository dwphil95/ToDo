let addButton = document.getElementById("add-button");
let clearButton = document.getElementById("clear-completed-button");
let emptyButton = document.getElementById("empty-button");
let saveButton = document.getElementById("save-button");
let toDoEntryBox = document.getElementById("todo-entry-box");
let toDoList = document.getElementById("todo-list");

addButton.addEventListener("click", addToDoItem);
clearButton.addEventListener("click", clearCompletedToDoItems);
emptyButton.addEventListener("click", emptyList);
saveButton.addEventListener("click", saveList);


function addToDoItem() {
    let itemText = toDoEntryBox.value;
    newToDoItem(itemText, false, false);
}

function newToDoItem(itemText, completed, example) {
    let toDoItem = document.createElement("li");
    let toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed)
        toDoItem.classList.add("completed");
    if (example)
        toDoItem.classList.add("example");

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function toggleToDoItemState() {
    if (this.classList.contains("completed"))
        this.classList.remove("completed");
    else
        this.classList.add("completed");
}

function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0)
        completedItems.item(0).remove();
}

function emptyList() {
    let toDoItems = toDoList.children;

    while (toDoItems.length > 0)
        toDoItems.item(0).remove();
}

function saveList() {
    let toDos = [];

    for (let i = 0; i < toDoList.children.length; i++) {
        let toDo = toDoList.children.item(i);
        let toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
    alert("To-do list saved!");
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        let toDos = JSON.parse(localStorage.getItem("toDos"));

        if (toDos.length === 0) {
            newToDoItem("Example item #1", false, true);
            newToDoItem("Example item #2", true, true);
            newToDoItem("Example item #3", false, true);
        }
        else {
            for (let i = 0; i < toDos.length; i++) {
                let toDo = toDos[i];
                newToDoItem(toDo.task, toDo.completed, false);
            }
        }
    }
    else {
        newToDoItem("Example item #1", false, true);
        newToDoItem("Example item #2", true, true);
        newToDoItem("Example item #3", false, true);
    }
}

loadList();