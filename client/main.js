import {processform,editEvent,finishEvent,undoEvent,removeEvent} from './eventlisteners.js'
import { getDone,getRemaining } from './network_calls.js';

const taskform = document.getElementById('taskform');
const todolist = document.getElementById('todo-list');
const donelist = document.getElementById('done-list');
//EventListeners
taskform.addEventListener('submit',processform)

todolist.addEventListener('click',editEvent)
todolist.addEventListener('click',finishEvent)
todolist.addEventListener('click',removeEvent)

donelist.addEventListener('click',removeEvent);
donelist.addEventListener('click',undoEvent);

// GET on load
window.onload = async ()=>{
    taskform.reset();
    const getTaskFuncs = [getRemaining,getDone]
    for await (const task of getTaskFuncs){
        const resp = await task();
        if (!resp.message){
            console.log(resp)
            if (resp.length>0 && resp[0].status==1) await populateDoneList(resp)
            else if (resp.length>0 && resp[0].status==0) await populateToDos(resp)
        }else(alert(resp.message))
    }
}

async function populateToDos(data){
    for (let i=0;i<data.length;i++){
        const li = document.createElement('li');
        li.setAttribute('data-id',data[i].id)
        li.innerHTML = `<b>Task</b>:${data[i].name}|<b>Description</b>:${data[i].description}`
        li.appendChild(createDoneButton())
        li.appendChild(createEditButton())
        li.appendChild(createDeleteButton())
        todolist.appendChild(li)
    }
}

async function populateDoneList(data) {
    for (let i=0;i<data.length;i++){
        const li = document.createElement('li');
        li.setAttribute('data-id',data[i].id)
        li.innerHTML = `<b>Task</b>:${data[i].name}|<b>Description</b>:${data[i].description}`
        li.appendChild(createUndoButton())
        li.appendChild(createDeleteButton())
        donelist.appendChild(li)
    }
}

function createDoneButton(){
    let donebtn = document.createElement('button');
    donebtn.className = 'btn btn-primary done';
    donebtn.textContent = 'Done'
    return donebtn;
}

function createUndoButton(){
    let donebtn = document.createElement('button');
    donebtn.className = 'btn btn-primary undo';
    donebtn.textContent = 'Undo'
    return donebtn;
}
function createDeleteButton(){
    let deletebtn = document.createElement('button');
    deletebtn.className = 'btn btn-danger delete';
    deletebtn.textContent="Delete"
    return deletebtn;
}

function createEditButton(){
    let editbtn = document.createElement('button');
    editbtn.className = 'btn btn-primary edit';
    editbtn.textContent='Edit'
    return editbtn;
}
