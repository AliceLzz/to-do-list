const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    console.group(`addTask()`);
    console.log(`addTask() was called...`);
    console.log(`inputbox.value: ${inputBox.value}`);
    if(inputBox.value === ''){
        console.log(`if condition: inputBox.value === ''`);
        alert("You must write something!");
    }
    else{
        console.log(`if condition: else`);
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        console.log(`typeof(listContainer): ${typeof(listContainer)}`);
        listContainer.appendChild(li);
        let image = document.createElement("img");
        image.src = "./images/close.svg";
        li.appendChild(image);
        console.log(`typeof(li): ${typeof(li)}`);
    }
    inputBox.value = "";
    //saveData();
    console.groupEnd(`addTask()`);
}

listContainer.addEventListener("click", function(e){
    console.group(`addEventListener()`);
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
       // saveData();
    }
    else if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        //saveData();
    }
},false);
console.groupEnd(`addEventListener()`);

/*function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}*/

function showTask(){
    listContainer.innerHTML - localStorage.getItem("data");
}
showTask();

function loadPage(array){
    console.group(`loadPage()`);
        for(let i=0; i<array.length; i++){
            let li = document.createElement("li");
            li.innerHTML = array[i].task;
            let image = document.createElement("img");
            image.src = "./images/close.svg";
            li.appendChild(image);
            if (array[i].completed){
                li.classList.add("checked")
            }
            listContainer.appendChild(li);
        }       
        console.groupEnd(`loadPage()`);
}


let x = null;
let y = [{ task: "Buying more Beanies", completed: false }];
function getTask() {
    fetch("http://localhost:5500/", {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            loadPage(data)
            //here we add to generate tasks
        })
        .catch((error) => {
            console.log("Somethig is wrong with server", error);
        });
}
function saveTask(e) {
    e.preventDefault()
    let Task=document.getElementsByTagName("li");
    let arrayTask=[]
    for(let i=0; i<Task.length; i++){
        if(Task[i].classList.contains("checked")){
            arrayTask.push({
                task:Task[i].textContent,
                completed:true
            })
        }else{
            arrayTask.push({
                task:Task[i].textContent,
                completed:false
            })
        }
    }
   
    fetch("http://localhost:5500/save", {
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

window.addEventListener("load", ()=>{
    document.getElementById("saveButton").addEventListener('click',(e)=>saveTask(e))
    getTask()
})
