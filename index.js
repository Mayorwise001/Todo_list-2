let taskListArray = [];

//Retrive saved file in the local storage.
let isdataStorage = localStorage.getItem("todoTaskList");
if(isdataStorage !== null){
    taskListArray = JSON.parse(isdataStorage);
    renderTaskList()
}
function saveTask(){
   
    let taskName = document.getElementById("txtItem").value;

    if(document.getElementById("txtItem").value == ""){
        console.log("hello");
    }else{
        renderTaskList()
    let todoObject = {
        taskId: taskListArray.length + 1,
        taskName: taskName
    };
    document.getElementById("txtItem").value = "";

    taskListArray.push(todoObject);
    localStorage.setItem("todoTaskList", JSON.stringify(taskListArray));
    renderTaskList()
}
}
function renderTaskList(){
    document.getElementById("myTaskList").innerHTML="";
    for(let index=0; index < taskListArray.length; index++){
        let checkedIcon = document.createElement("input")
        checkedIcon.setAttribute("type", "checkbox");
        checkedIcon.classList.add("checker");
        checkedIcon.addEventListener("click", ()=>{
            dynamicLi.classList.toggle("checked");
            console.log("event hello")
        })
    let dynamicLi = document.createElement("li");
    dynamicLi.classList.add("list");
    let iconDiv = document.createElement("div");
    dynamicLi.appendChild(iconDiv);
    let dynamicPara = document.createElement("p");
    dynamicLi.appendChild(dynamicPara);
    dynamicPara.textContent = taskListArray[index].taskName;
    
    //Create of the delete and edit icons

    //if(dynamicPara.textContent !==""){
//rgb(10, 125, 41)
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa");
    editIcon.classList.add("fa-pencil-square");
    editIcon.style="font-size:24px; color: lightgreen;";
    editIcon.addEventListener("click", editTask)
    editIcon.taskId = taskListArray[index].taskId
    iconDiv.appendChild(editIcon);
    let deleteIcon = document.createElement("i")
    deleteIcon.classList.add("fa");
    deleteIcon.classList.add("fa-trash-o");
    deleteIcon.style = "font-size:24px; color: white;"
    deleteIcon.addEventListener("click", deleteTask);
    deleteIcon.taskId = taskListArray[index].taskId;
    iconDiv.appendChild(deleteIcon);
    iconDiv.appendChild(checkedIcon);


    document.getElementById("myTaskList").appendChild(dynamicLi);
    }
}

function deleteTask(event){
//debugger;
let index = taskListArray.findIndex(m=>m.taskId == event.target.taskId);
taskListArray.splice(index, 1);
localStorage.setItem("todoTaskList", JSON.stringify(taskListArray));
renderTaskList();
}

function editTask(event){
//debugger;
let obj = taskListArray.find(m=>m.taskId == event.target.taskId);
document.getElementById("txtItem").value = obj.taskName;

}

function removeAll(){
    taskListArray.splice(0);
    localStorage.setItem("todoTaskList", JSON.stringify(taskListArray));
    renderTaskList();
}