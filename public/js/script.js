//const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container"); //vanilla js
const inputBox = $("#input-box"); //dom jquery
//const listContainer = $("#list-container");

function addTask() {
    if (inputBox.val() === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.val(); //vanilla js, dom jquery
        listContainer.appendChild(li);
        let image = document.createElement("img");
        image.src = "./images/close.svg";
        li.appendChild(image);
    }
    inputBox.val("");
    //saveData();
}

listContainer.addEventListener(
    "click",
    function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            // saveData();
        } else if (e.target.tagName === "IMG") {
            e.target.parentElement.remove();
            //saveData();
        }
    },
    false
);

/*function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}*/

function showTask() {
    listContainer.innerHTML - localStorage.getItem("data");
}
showTask();

function loadPage(array) {
    for (let i = 0; i < array.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = array[i].task;
        let image = document.createElement("img");
        image.src = "../images/close.svg";
        li.appendChild(image);
        if (array[i].completed) {
            li.classList.add("checked");
        }
        listContainer.appendChild(li);
    }
}

let x = null;
let y = [{ task: "Buying more Beanies", completed: false }];
//to connect with server and get an array of task
function getTask() {
    fetch("http://localhost:5500/read", {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            loadPage(data);
            //here we add to generate tasks
        })
        .catch((error) => {
            console.log("Somethig is wrong with server", error);
        });
}
//to connect with server and save an array of task
function saveTask(e) {
    e.preventDefault();
    let Task = document.getElementsByTagName("li");
    let arrayTask = [];
    for (let i = 0; i < Task.length; i++) {
        if (Task[i].classList.contains("checked")) {
            arrayTask.push({
                task: Task[i].textContent,
                completed: true,
            });
        } else {
            arrayTask.push({
                task: Task[i].textContent,
                completed: false,
            });
        }
    }

    fetch("http://localhost:5500/save", {
        //ES6 js
        method: "PUT",
        headers: { task: "save" },
        body: JSON.stringify(arrayTask),
    })
        .then((response) => {
            console.log("to Do list saved");
            //return response.json();
        })
        .catch((error) => {
            console.log("Somethig is wrong with server", error);
        });
}

window.addEventListener("load", () => {
    //ES6 js annonymous function
    document
        .getElementById("saveButton")
        .addEventListener("click", (e) => saveTask(e));
    getTask();
});
