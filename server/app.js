const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./utils/db_con.js');
const taskRoutes = require('./routes/tasks.js')
const setcors = require('./middlewares/setcors.js')
app.use(setcors.setcors)
app.use(bodyParser.json({extended:false}))

app.use('/tasks',taskRoutes)
sequelize.sync().then(()=>{
    app.listen(PORT)
}).catch(err=>console.log(err))
