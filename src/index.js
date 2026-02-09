import "./style.css";
import "./style2.css";
import "./style3.css";
import "./style4.css";

import { compareAsc, format} from "date-fns";
import {Listoflist, CreateList, Task} from "./list.js";

let rootList = new Listoflist();//object where all lists are stored

const myListsDialog = document.querySelector("#myListsDialog");
const createListBtn = document.querySelector("#createListButton");
const confirmBtn = document.querySelector("#confirmBtn");
const input = document.querySelector("#dialogInput");
const createListContainer = document.querySelector(".createListContainer");
const listHeader = document.querySelector(".displayListHeader");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskInput = document.querySelector("#taskInput");
const displayListItems = document.querySelector(".displayListItems");
const displayTaskHeader = document.querySelector(".displayTaskHeader");
const textArea = document.querySelector("#textArea");
const textAreaBtn = document.querySelector("#textAreaBtn");
const dueDate = document.querySelector("#dueDate");
const priority = document.querySelector("#priority");
const dueDateBtn = document.querySelector("#dueDateBtn");
const priorityBtn = document.querySelector("#priorityBtn");
const displayTaskInfoOne = document.querySelector(".displayTaskInfoOne");
const displayTaskHeaderContainer = document.querySelector(".displayTaskHeaderContainer");
const btnContainer = document.querySelector(".btnContainer");
const describe = document.querySelector("#description");
const delListBtn = document.querySelector(".delListBtn");

defaultList();
defaultTask();

//Add and display all the lists
createListBtn.addEventListener("click", () => {
    myListsDialog.showModal();
});


function confirmBtnHandler(event) {
    event.preventDefault();
    myListsDialog.close(input.value);
    const listName = input.value;
    rootList[listName] = new CreateList();
}


function dialogCloseHandler() {
    if(myListsDialog.returnValue !== ""){
      const div = createNewElement(createListContainer, "div", "dialogDiv");
      const btn = createNewElement(div, "button", "view");
      btn.textContent = myListsDialog.returnValue;
      btn.addEventListener("click", viewList);
      btn.addEventListener("click", selectList);
      div.id = `${myListsDialog.returnValue}`;
      input.value = "";
      }
}


//Add and display all the tasks
function viewList(e) {
    listHeader.textContent = e.target.textContent;
    if(rootList[listHeader.textContent][displayTaskHeader.textContent] === undefined){
        displayTaskHeader.textContent = "";
    }
    viewAllTasks();
    e.target.addEventListener("click", (event) => {
        const defTask = document.querySelector("#labelId1");
        if(defTask) {
            defTask.click();
        }
    });
    createDescription();
}

function deleteList() {
    //localStorage.removeItem(rootList[listHeader.textContent]);
    if(listHeader.textContent !== "Today" && listHeader.textContent !== ""){
    delete rootList[listHeader.textContent];
    const divId = document.querySelector(`#${listHeader.textContent}`);
    createListContainer.removeChild(divId);
    listHeader.textContent = "";
    displayListItems.textContent = "";
    describe.textContent = "";
    }
}


function viewAllTasks() {
    displayListItems.textContent = "";
    let i = 0;
    const keys = Object.keys(rootList[listHeader.textContent]);
    keys.forEach(key => {
        i++;
        const p = createNewElement(displayListItems, "p", "taskContainer");
        
        const checkbox = createNewElement(p, "input", `taskCheckBox`);
        checkbox.type = "checkbox";
        checkbox.id =`inputId${i}`;


        const label = createNewElement(p, "label", `taskLabel`);
        label.for = `inputId${i}`;
        label.id = `labelId${i}`
        label.textContent = key;
        label.addEventListener("click", clickOnTaskHandler);
        label.addEventListener("click", selectTask);

        
        const div = createNewElement(p, "div", "date");
        if(rootList[listHeader.textContent][key].dueDate === undefined){
            div.textContent = "";
        } else {
            const formattedDate = format(new Date(rootList[listHeader.textContent][key].dueDate), "dd-MM-yyyy");
            div.textContent = `Due: ${formattedDate}`;
            div.setAttribute("style", "color: label.color;");
        }

        switch(rootList[listHeader.textContent][key].priority){
           
            case "High": label.setAttribute("style", "color: #800080;");
            break;
            case "Medium": label.setAttribute("style", "color: #7F00FF;");
            break;
            case "Low": label.setAttribute("style", "color: #E30B5C;");
            break;
            default : label.setAttribute("style", "color: black;");
        }
    })
}



function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}


function addTaskBtnHandler() {
    const taskName = taskInput.value;
    if(taskName !== ""){
        rootList[listHeader.textContent][taskName] = new Task();
        viewAllTasks();
        taskInput.value = "";
        }
    }



//Add and display task info
function clickOnTaskHandler(e) {
       btnContainer.textContent = "";
       displayTaskHeader.textContent = `${e.target.textContent}`;
       const del = createNewElement(btnContainer, "button", "deleteBtn");
       del.textContent = "Delete Task";
       del.addEventListener("click", deleteTask);
       createDescription();
       //describe.textContent = rootList[listHeader.textContent][displayTaskHeader.textContent].description;
}

function deleteTask() {
    delete rootList[listHeader.textContent][displayTaskHeader.textContent];
    describe.textContent = "";
    displayTaskHeader.textContent = "";
    viewAllTasks();
    
}


function addTaskDescription() {
    
    rootList[listHeader.textContent][displayTaskHeader.textContent].description = textArea.value;
    createDescription();
    textArea.value = "";
    console.log(rootList[listHeader.textContent][displayTaskHeader.textContent].description);
}


function createDescription() {
    if(displayTaskHeader.textContent === ""){
        describe.textContent = "";
    }else if(rootList[listHeader.textContent][displayTaskHeader.textContent].description !== undefined){
        describe.textContent = rootList[listHeader.textContent][displayTaskHeader.textContent].description;
        }else{
            describe.textContent = "Add Task Description";
        }
    
    //console.log(rootList[listHeader.textContent][displayTaskHeader.textContent].description);
}


function addTaskDueDate() {
    rootList[listHeader.textContent][displayTaskHeader.textContent].dueDate = dueDate.value;
    dueDate.value = dueDate.defaultValue;
    viewAllTasks();
    console.log(rootList[listHeader.textContent][displayTaskHeader.textContent].dueDate);
}


function setPriority() {
    
    rootList[listHeader.textContent][displayTaskHeader.textContent].priority = priority.value;
    //priority.value = priority.defaultValue;
    viewAllTasks();
    console.log(rootList[listHeader.textContent][displayTaskHeader.textContent].priority);
}




function defaultList() {
    const firstList = "Today";
    rootList[firstList] = new CreateList();
    const div = createNewElement(createListContainer, "div", "defaultListDiv");
    const btn = createNewElement(div, "button", "view");
    btn.textContent = firstList;
    btn.addEventListener("click", viewList);
    btn.addEventListener("click", selectList);
    listHeader.textContent = firstList;
    
}



function defaultTask() {
    const firstTask = "Create your first task";
    const firstDescription = "Start by adding your very first task. It can be anything you want to get done today—big or small.";
    rootList[listHeader.textContent][firstTask] = new Task();
    rootList[listHeader.textContent][firstTask].description = firstDescription;
    displayTaskHeader.textContent = firstTask;
    const btn = document.querySelector(".view");
    document.addEventListener("DOMContentLoaded", (event) => {
        if(btn) {
            btn.click();
        }});
    const view = document.querySelector(".view");
    view.addEventListener("click", (event) => {
        const defTask = document.querySelector("#labelId1");
        if(defTask) {
            defTask.click();
        }
    });
    viewAllTasks();
    createDescription();
    
    console.log(rootList[listHeader.textContent][displayTaskHeader.textContent].description);
    
    
}


function createNewElement(parent, child, className) {
        const element = document.createElement(`${child}`);
        element.classList.add(`${className}`);
        parent.appendChild(element);
        return element;
    }


function selectList(e) {
    const currentlySelected = document.querySelector(".view.selected");
    if(currentlySelected) {
        currentlySelected.classList.remove("selected");
    }
    e.target.classList.add("selected");
}


function selectTask(e) {
    const currentlySelected = document.querySelector(".taskLabel.selected");
    if(currentlySelected) {
        currentlySelected.classList.remove("selected");
    }
    e.target.classList.add("selected");
}


confirmBtn.addEventListener("click", confirmBtnHandler);
myListsDialog.addEventListener("close", dialogCloseHandler);
addTaskBtn.addEventListener("click", addTaskBtnHandler);
textAreaBtn.addEventListener("click", addTaskDescription);
dueDateBtn.addEventListener("click", addTaskDueDate);
priorityBtn.addEventListener("click", setPriority);
delListBtn.addEventListener("click", deleteList);



/*

function populateStorage() {
    localStorage.setItem("list", JSON.stringify(rootList));
}

setList();

window.addEventListener("beforeunload", populateStorage);

function setList() {
    
    console.log(JSON.parse(localStorage.getItem("list")))
    rootList = JSON.parse(localStorage.getItem("list"));
    
    const keys = Object.keys(rootList);
    console.log(keys);
    let i = 0;
    keys.forEach(key => {
        i++;
        const div = createNewElement(createListContainer, "div", "dialogDiv");
        const btn = createNewElement(div, "button", "view");
        btn.textContent = key;
        btn.addEventListener("click", viewList);
        btn.addEventListener("click", selectList);
        document.addEventListener("DOMContentLoaded", (event) => {
        if(i === 1) {
            btn.click();
        }
    });
        btn.addEventListener("click", (event) => {
        const defTask = document.querySelector("#labelId1");
        if(defTask) {
            defTask.click();
        }
    });
    })
    }



createDefaultList();
populateStorage();
setList();


if(!localStorage.getItem("list")){
    defaultList();
    defaultTask();
    populateStorage();
} else {
    setList();
}

window.addEventListener("beforeunload", populateStorage); */


