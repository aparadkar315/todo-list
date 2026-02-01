import "./style.css";
import { compareAsc, format} from "date-fns";
import {Listoflist, CreateList, Task} from "./listoflist.js";

const rootList = new Listoflist();//object where all lists are stored

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
//const describe = document.querySelector(".description");

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
      const div = createNewElement(createListContainer, "div", "dialogDiv");
      const btn = createNewElement(div, "button", "view");
      btn.textContent = myListsDialog.returnValue;
      btn.addEventListener("click", viewList);
      btn.addEventListener("click", selectList);
      input.value = "";
}


//Add and display all the tasks
function viewList(e) {
    listHeader.textContent = e.target.textContent;
    if(rootList[listHeader.textContent][displayTaskHeader.textContent === undefined]){
        displayTaskHeader.textContent = "";
    }
    viewAllTasks();
    displayTaskInfoOne.textContent = "Description";
    e.target.addEventListener("click", (event) => {
        const defTask = document.querySelector("#labelId1");
        if(defTask) {
            defTask.click();
        }
    });
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
           
            case "High": label.setAttribute("style", "color: #012A4A;");
            break;
            case "Medium": label.setAttribute("style", "color: #014F86;");
            break;
            case "Low": label.setAttribute("style", "color: rgb(75, 153, 158);");
            break;
            default : label.setAttribute("style", "color: black;");
        }
    })
}



function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


function addTaskBtnHandler() {
    if (isEmpty(rootList)){
        alert("Please select a list from 'My Lists' to add this task to.  You can create a list by clicking on the  '+'  icon besides 'My Lists'");
        return;
    }else{
    const taskName = taskInput.value;
    rootList[listHeader.textContent][taskName] = new Task();
    viewAllTasks();
    taskInput.value = "";
    }
}


//Add and display task info
function clickOnTaskHandler(e) {
       btnContainer.textContent = "";
       displayTaskHeader.textContent = `${e.target.textContent}`;
       displayTaskInfoOne.innerHTML = "";
       displayTaskInfoOne.textContent = "Description";
       const del = createNewElement(btnContainer, "button", "deleteBtn");
       del.textContent = "Delete Task";
       del.addEventListener("click", deleteTask);
       createDescriptionContainer();
       //describe.textContent = rootList[listHeader.textContent][displayTaskHeader.textContent].description;
}

function deleteTask() {
    delete rootList[listHeader.textContent][displayTaskHeader.textContent];
    displayTaskInfoOne.textContent = "Description";
    const describe = createNewElement(displayTaskInfoOne, "p", "describe");
    describe.textContent = "";
    displayTaskHeader.textContent = "";
    viewAllTasks();
    
}


function addTaskDescription() {
    
    rootList[listHeader.textContent][displayTaskHeader.textContent].description = textArea.value;
    displayTaskInfoOne.innerHTML = "";
    displayTaskInfoOne.textContent = "Description";
    createDescriptionContainer();
    textArea.value = "";


    console.log(rootList[listHeader.textContent][displayTaskHeader.textContent].description);
}


function createDescriptionContainer() {
    const describe = createNewElement(displayTaskInfoOne, "p", "describe");
    if(rootList[listHeader.textContent][displayTaskHeader.textContent].description === undefined){
        describe.textContent = "Add Task Description";
        describe.setAttribute("style", "color: grey;");
    }else{
        describe.textContent = rootList[listHeader.textContent][displayTaskHeader.textContent].description;
        }
    console.log(rootList[listHeader.textContent][displayTaskHeader.textContent].description);
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
    const div = createNewElement(createListContainer, "div", "defaultListdiv");
    const btn = createNewElement(div, "button", "view");
    btn.textContent = "Today";
    listHeader.textContent = "Today";
    rootList[btn.textContent] = new CreateList();
    btn.addEventListener("click", viewList);
    btn.addEventListener("click", selectList);
    document.addEventListener("DOMContentLoaded", (event) => {
        if(btn) {
            btn.click();
        }
    });
    
}


function defaultTask() {
    const firstTask = "Create your first task";
    const firstDescription = "Start by adding your very first task. It can be anything you want to get done today—big or small.";
    displayTaskHeader.textContent = firstTask;
    rootList[listHeader.textContent][displayTaskHeader.textContent] = new Task();
    viewAllTasks();
    const view = document.querySelector(".view");
    view.addEventListener("click", (event) => {
        const defTask = document.querySelector(".taskLabel");
        if(defTask) {
            defTask.click();
        }
    });
    rootList[listHeader.textContent][displayTaskHeader.textContent].description = firstDescription;
    console.log(rootList[listHeader.textContent][displayTaskHeader.textContent].description);
    createDescriptionContainer();
    
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
defaultList();
defaultTask();

/*
function populateStorage() {
    localStorage.setItem("list", JSON.stringify(rootList));

    setList();
}

function setList() {
    rootList = JSON.parse(localStorage.getItem("list"));
}

if(!localStorage.getItem("list")){
    populateStorage();
} else {
    setList();
}*/


