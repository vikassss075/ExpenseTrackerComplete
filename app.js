const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const path = require('path');

const router = require('./routes/expenseRoutes');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
     res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use('/expenses', router);

const connection = require('./utils/db-connection');
connection.sync({force:false})
.then(()=>{
    connection.authenticate();
    app.listen(3000);
    console.log("server is running...");
})
.catch((error)=>{
    console.log(error);
})