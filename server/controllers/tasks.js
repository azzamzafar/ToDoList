const TaskModel = require('../models/task_model.js');
const sequelize = require('../utils/db_con.js');

exports.postAddTask = async (req,res,next)=>{
    const name = req.body.name;
    const description = req.body.description;
    try{
        const result = await sequelize.transaction(async (t)=>{
            return await TaskModel.create({
                name:name,
                description:description,
                status:0
            },{transaction:t})
        })
        res.status(201).json({'msg':'created'})
    }catch(err){
        res.status(500).json({'msg':'Internal Server Error'})
    }
}

exports.putEditTask = async(req,res,next) =>{
    const taskId = req.params.taskId;
    if (!req.body.name || !req.body.description){
        return res.status(422).json({"msg":"Incorrect Body"})
    }
    try{
        const result = await sequelize.transaction(async (t)=>{
            return await TaskModel.update({
                name:req.body.name,
                description:req.body.description
            },{where:{id:taskId}},{transaction:t})
        })
        res.status(201).json({"msg":"updated"})
    }catch(err){
        res.status(500).json({'msg':"Internal Server Error"})
    }
}

exports.putChangeStatus = async (req,res,next) => {
    if (!(req.body.status==1 || req.body.status==0)) return res.status(422).json({"msg":"Incorrect body"})
    const taskId = req.params.taskId;
    try{
        const result = await sequelize.transaction( async (t)=>{
            return await TaskModel.update({
                status:req.body.status
            },{where:{id:taskId}},{transaction:t})
        })
        res.status(201).json({"msg":"updated"})
    }catch(err){
        res.status(500).json({'msg':"Internal Server Error"})
    }
}
exports.getToDoList = async(req,res,next) => {
    try{
        const result = await sequelize.transaction(async(t)=>{
            return await TaskModel.findAll({where:{status:0}},
                {transaction:t})
        })
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({'msg':"Internal Server Error"})
    }
}
exports.getDoneList = async (req,res,next) =>{
    try{
        const result = await sequelize.transaction(async(t)=>{
            return await TaskModel.findAll({where:{status:1}},
                {transaction:t})
        })
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({'msg':"Internal Server Error"})
    }
}

exports.getTask = async (req,res,next) =>{
    const taskId = req.params.taskId;
    try{
        const result = await sequelize.transaction( async(t)=>{
            return await TaskModel.findByPk(taskId,
                {transaction:t})
        })
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({'msg':"Internal Server Error"})
    }
}

exports.deleteTask = async (req,res,next) => {
    const taskId = req.params.taskId;
    try{
        const result = await sequelize.transaction( async(t)=>{
            const task = await TaskModel.findByPk(taskId,
                {transaction:t})
            return await task.destroy({transaction:t})
        })
        res.status(204).send('Deleted')
    }catch(err){
        res.status(500).json({'msg':"Internal Server Error"})
    }
}