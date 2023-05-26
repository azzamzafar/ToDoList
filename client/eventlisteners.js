import {createTask,editTask,getTask,changeStatus,removeTask} from './network_calls.js'

const taskform = document.getElementById('taskform');

export async function processform(e){
    e.preventDefault();
    const formdata = {}
    const method = taskform.querySelector('input[name="_method"]').value;
    const inputs = taskform.querySelectorAll('input[name]')
    for (const input of inputs){
        if (input.name=="task")formdata.name = input.value;
        else if (input.name=="description")formdata.description=input.value;
    }
    if (method=="PUT"){
        const taskId = taskform.querySelector('input[name="_id"]').value;
        const resp = await editTask(taskId,formdata)
        if (!resp.message)location.reload()
        else alert(resp.message)
    }else{
        // POST Case
        const resp = await createTask(formdata)
        if (!resp.message) location.reload()
        else alert(resp.message)
    }
}

export async function editEvent(e){
    const inputs = taskform
    .querySelectorAll('input[name]')
    if (e.target.classList.contains('edit')){
        const taskId = e.target.parentElement
        .getAttribute('data-id');
        const response = await getTask(taskId);
        if (!response.message){
            for (const input of inputs){
                if (input.name=="_method")input.value="PUT";
                else if (input.name=="_id")input.value=taskId;
                else if (input.name=="task")input.value=response.name;
                else if (input.name=="description")input.value=response.description;
            }
        }else alert(response.message)
    }    
}

export async function finishEvent(e){
    e.preventDefault()
    if (e.target.classList.contains('done')){
        const taskId = e.target.parentElement.getAttribute('data-id')
        const response = await changeStatus(taskId,{status:1});
        if (!response.message)location.reload()
        else alert(response.message)
    }
}
export async function undoEvent(e){
    e.preventDefault()
    if (e.target.classList.contains('undo')){
        const taskId = e.target.parentElement.getAttribute('data-id')
        const response = await changeStatus(taskId,{status:0});
        if (! response.message)location.reload()
        else alert(response.message)
    }
}

export async function removeEvent(e){
    if (e.target.classList.contains('delete')){
        const expenseId = e.target.parentElement.getAttribute('data-id');
        const response = await removeTask(expenseId);
        if (!response.message)location.reload()
        else alert(response.message)
    }
}