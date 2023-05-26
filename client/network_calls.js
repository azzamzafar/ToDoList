const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:3000/'
})

export async function getRemaining(){
    try{
        const resp = await axiosInstance.get('tasks/todos');
        if (resp && resp.status==200){
            const data = await resp.data;
            return data;
        }else{
            throw(Error)
        }
    }catch(err){
        return err;
    }
}
export async function getDone(){
    try{
        const resp = await axiosInstance.get('tasks/done');
        if (resp && resp.status==200){
            const data = await resp.data;
            return data;
        }else{
            throw(Error)
        }
    }catch(err){
        return err;
    }
}


export async function createTask(body) {
    try{
        const resp = await axiosInstance.post('tasks',body);
        if (resp.status<300) return resp;
        else throw(Error)
    }catch(err){
        return err;
    }
}

export async function editTask(id,body){
    try{
        const resp = await axiosInstance.put(`tasks/todos/edit/${id}`,body);
        if (resp.status<300) return resp
        else throw(Error)
    }catch(err){
        return err;
    }
}

export async function changeStatus(id,body){
    try{
        const resp = await axiosInstance.put(`tasks/changeStatus/${id}`,body);
        if (resp.status<300) return resp
        else throw(Error)
    }catch(err){
        return err;
    }
}
export async function getTask(id){
    try{
        const resp = await axiosInstance.get(`tasks/${id}`);
        if (resp && resp.status==200){
            const data = await resp.data;
            return data;
        }else{throw Error}

    }catch(err){
        return err;
    }
}
export async function removeTask(id){
    try{
        const resp = await axiosInstance.delete(`tasks/${id}`);
        if (resp.status<300) return resp;
        else throw(Error)
    }catch(err){
        return err;
    }
}