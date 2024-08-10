let task_input=document.getElementById("task");
let sub_btn=document.getElementById("submit");
let tasks_box=document.getElementById("tasks_box");

let Arr=[];
if(localStorage.getItem("Tasks")){
    Arr=JSON.parse(localStorage.getItem("Tasks"));
}
console.log(Arr);
get_data_fromStorege()
sub_btn.addEventListener("click",(event)=>{
    event.preventDefault();
    // get_data_fromStorege()
    if(task_input.value!=""){
        addTask_toArray(task_input.value);
        task_input.value="";
    }

})

function addTask_toArray(taskValue){
    let task={
        id:Date.now(),
        title:taskValue,
        completed:false
    };
    Arr.push(task);
    addTask_toDom(Arr);
    add_toLocalStorage(Arr);
}

function addTask_toDom(arr){
    tasks_box.innerHTML="";
    arr.forEach((ele)=>{
        let div=document.createElement("div");
        div.className="task";
        div.setAttribute("data-id",ele.id);
        let text_title=document.createElement("p");
        text_title.className="task_title";
        text_title.appendChild(document.createTextNode(ele.title))
        div.appendChild(text_title);
        //create delete btn
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("del"));
        div.appendChild(span);
        // add div to tasks box 
        tasks_box.appendChild(div);
        // for task status 
        if(ele.completed){
            text_title.classList.add("done");
            span.innerHTML="done";
            span.classList.add("done");
        }
    }); 
} 
//add array to local storge
function add_toLocalStorage(arr){
    window.localStorage.setItem("Tasks",JSON.stringify(arr));
}
//get fata from localstorage
function get_data_fromStorege(){
    data=window.localStorage.getItem("Tasks");
    if(data){
        let tasks=JSON.parse(data);
        addTask_toDom(tasks);
    }
}

// handle delete button 
tasks_box.addEventListener("click",(e)=>{
    // check if the click in delete btn 
    if(e.target.classList.contains("del")){
        //remove from dom
        e.target.parentElement.remove();
        //remove from storage
        //id هستخدم الاتربيوت اللى حطيتو فى الديف بتاع ال 
        let task_id=e.target.parentElement.getAttribute("data-id");
        removeTask_fromStorege(task_id);
    }
    //Update Task
    //check if the click in the task p 
    if(e.target.classList.contains("task_title")){
        //toggle completed for  task
        change_Status(e.target.parentElement.getAttribute("data-id"));
        //toggle Done class to task
        e.target.classList.toggle("done");
    }
})
//remove task from storege using task id
function removeTask_fromStorege(id){
    Arr=Arr.filter((task)=>{
        return task.id!=id;
    });
    add_toLocalStorage(Arr);
}
//toggle completed for  task
function change_Status(id){
    console.log(Arr)
    for(let i=0 ;i<Arr.length ; i++){
        if(Arr[i].id==id){
            Arr[i].completed==false? Arr[i].completed=true : Arr[i].completed=false;
        }
    }
    add_toLocalStorage(Arr);
    addTask_toDom(Arr);
}