const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/tasks.js')


router.post('',taskControllers.postAddTask);

router.get('/todos',taskControllers.getToDoList);
router.put('/todos/edit/:taskId',taskControllers.putEditTask);

router.get('/done',taskControllers.getDoneList);

router.put('/changeStatus/:taskId',taskControllers.putChangeStatus)
router.get('/:taskId',taskControllers.getTask);
router.delete('/:taskId',taskControllers.deleteTask);

module.exports = router;