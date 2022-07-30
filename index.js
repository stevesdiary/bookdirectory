const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

require('dotenv').config();
const connection= mysql.createConnection({
   host:process.env.HOST,
   port: process.env.PORT,
   user: process.env.USERNAME,
   password: process.env.PASSWORD,
   database: process.env.DATABASE
})

connection.connect((err)=>{
   if (err)throw err;
   console.log('Connected to MYSQL server!')
})

app.use(bodyParser.json());

app.post('/books', (req, res)=> {
   const body = req.body
   for (let index = 1; index < 5; index++) {
      const element = body[index]
      const query = "INSERT INTO `directory` (`title`, `author`, `pages`, `year`, `category`, `format`) VALUES('"+ element.title + "', '" + element.author +"', '" + element.pages+ "','" + element.year + "', '" + element.category + "', '" + element.format+"')"
   connection.query(
      query,
   )
}
   res.send("Success");
   console.log("Successfully these these to the database:", body)
})

app.get('/getall', (req, res)=>{
   const body = req.body
   const query = "SELECT * FROM `directory` (`title`, `author`, `pages`, `year`, `category`, `format`) VALUES('"+ element.title + "', '" + element.author +"', '" + element.pages+ "','" + element.year + "', '" + element.category + "', '" + element.format+"')"
      // console.log({body, query})
connection.query(
   query,
   // "SELECT * FROM `directory`",
   function(error, result){
      console.log(result)
      res.send(result != null ? 'Success' : 'Fail')
   }
);
})

app.get('/getonebytitle', (req, res)=>{
   const body = req.body
   const query = "SELECT * FROM `directory` WHERE `title` LIKE '%" + body.title + "%'"
   connection.query(
      query,
      function (error, result){
         console.log(error, "Found:", result)
         res.send(result != null ? 'Success' : 'Fail')
      } 
   )
})

app.patch('/update', (req, res)=> {
   const body = req.body
   const query = 
   `UPDATE directory 
   SET title = '${body.title}', 
      author = '${body.author}', 
      pages = '${body.pages}', 
      year = '${body.year}', 
      category = '${body.category}', 
      format = '${body.format}' 
   WHERE id = '${body.id}'
   `
   connection.query(
      query,
      function (error, result){
         console.log(error, "SUccessfully updated:", result)
         res.send(result != null ? 'Success' : 'Data not found in the database')
      }
   )
})
app.delete('/delete', (req, res)=> {
   const body = req.body
   const query = "DELETE FROM `directory` WHERE `id` = '" + body.id +"'"
   connection.query(
      query,
      function (error, result){
         console.log(error, "SUccessfully deleted:", result)
         res.send(result != null ? 'Success' : 'Data not found in the database')
      }
   )
})

const PORT = 5000;
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));