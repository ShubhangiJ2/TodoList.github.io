// JavaScript source code

let tasks = [];
let localTask = [];
const tasksList = document.getElementById('taskList');
const addTaskInput = document.getElementById('addtask');
const tasksCounter = document.getElementById('taskcount');

const localtasksList = document.getElementById('taskList');

console.log('Working');

function addTaskToDOM(task) {

    const li = document.createElement('li');

    li.innerHTML = `      
          <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <i id="delete" data-id="${task.id}" style="font-size:24px" class="fa"> &#xf014;  </i>                 
`;

    tasksList.append(li);
}



function addLocalTaskToDOM(task) {

    const li = document.createElement('li');

    li.innerHTML = `      
          <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <i id="delete" data-id="${task.id}" style="font-size:24px" class="fa"> &#xf014;  </i>                 
`;

    localtasksList.append(li);
}



function renderList() {

    tasksList.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}



function renderLocalList() {

    localtasksList.innerHTML = '';

    for (let i = 0; i < localTask.length; i++) {
        addLocalTaskToDOM(localTask[i]);
    }

    tasksCounter.innerHTML = localTask.length;
}


function ToggleTaskStatus(taskId) { 

    const toggletask = tasks.filter(function (task) {   // pass the task we want to mark as complete.
        return task.id === taskId
    })

    if (toggletask.length > 0) { // filter will only return one item in the array that matches the taskid. 
        const currenttask = toggletask[0];
        currenttask.done = !currenttask.done;
        renderList();
        shownotification('Task status has been changed successfully');
        return;
    }
}

function deleteTask(taskId) {
    const newtasks = tasks.filter(function (task) {   // filter the array item by item and remove the id we want to delete and only return the other items not macthing the id.
        return task.id !== taskId
    })

    tasks = newtasks;
    renderList();
    shownotification('Task has been deleted successfully');
    return;
}

// to add the task into the task list
function addTask(task) {  
    if (task) {
        tasks.push(task);
        renderList(); 
        shownotification('Task is added successfully');
        return;
    }

    shownotification('Task cannnot be added');
}

function shownotification(text) {
    alert(text);
}

function handleInputKeypress(e) {

    if (e.key === 'Enter') {
        const text = e.target.value;
        console.log('text', text);

        if (!text) {
            shownotification('Task cannot be empty');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }
        e.target.value = "";
        addTask(task);
    }   
}

function pendingTask() {
    const pendingtasks = tasks.filter(function (task) {
        return task.done !== true;
    })

    localTask = pendingtasks;
    if (localTask == 0) {
        shownotification('Congratulations! There is no Pending Task');
        renderLocalList();
        return;
    }
    renderLocalList();
    shownotification('Pending Task is loaded successfully');
    return;   
}

function completedTask() {

    const completedtasks = tasks.filter(function (task) {
        return task.done !== false;
    })
    localTask = completedtasks;
    if (localTask == 0) {
        shownotification('You have not completed any task from you bucket');
        renderLocalList();
        return;
    }
    renderLocalList();
    
    shownotification('Completed Task is loaded successfully');
    return; 
}


function handleClickListener(e) {

    const target = e.target;

    if (target.id === 'delete') {

        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;

    }
    if (target.className === 'custom-checkbox') {
        const taskID = target.id;
        ToggleTaskStatus(taskID);
        return;
    }

    if (target.id === 'pending') {
        pendingTask();
    }

    if (target.id === 'completed') {
        completedTask();
    }

    if (target.id === 'all') {
        
        
        renderList();
        if (tasksCounter.innerHTML == 0) {
            shownotification('Currenlt there is no task in you bucket');
            return;
        }
        
        
    }

    if (target.id === 'clearlist') {
        tasks = [];
        tasksList.innerHTML = '';
        tasksCounter.innerHTML = 0;
		
    }
}


function InitializeApp() {
    
    addTaskInput.addEventListener("keyup", handleInputKeypress);
    document.addEventListener("click", handleClickListener);
}

InitializeApp();
















































