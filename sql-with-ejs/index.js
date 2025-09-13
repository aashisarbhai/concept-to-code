const mysql = require('mysql2');
const express=require('express');
const app=express();
const path=require("path");
const methodOverride=require("method-override");
const { v4: uuidv4 } = require('uuid');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

let faker;
(async () => {
  const mod = await import('@faker-js/faker');
  faker = mod.faker;
})();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'mysql'
});

  let getRandomUser = () => {
    return [
       faker.string.uuid(),
       faker.internet.username(),
       faker.internet.email(),
       faker.internet.password(),
    ];
  };

//home route
app.get("/",(req,res)=>{
  let q="select count(*) from user";

  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      count=result[0]["count(*)"];
      res.render("home.ejs");
    });
  }catch(err){
    console.log(err);
    res.send("some error in databse");
  }
});

//get(show) route
app.get("/user",(req,res)=>{
  let q="select * from user";

  try{
    connection.query(q,(err,users)=>{
      if(err) throw err;
      res.render("showusers.ejs",{ users })
    });
  }catch(err){
    console.log(err);
    res.send("some error in databse");
  }
});

//edit route-isse bs edit krne ka form milega
app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`select * from user where id='${id}'`;

    try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user=result[0];
      res.render("edit.ejs",{user});
    });
  }catch(err){
    console.log(err);
    res.send("some error in databse");
  }
});

//update(db) route-actual update
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;

  let q = "select * from user where id=?";

  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("some error in database");
    }

    let user = result[0];
    if (!user) return res.send("User not found");

    if (formPass !== user.password) {
      return res.send("wrong password");
    }

    let q2 = "update user set username=? where id=?";
    connection.query(q2, [newUsername, id], (err, updateResult) => {
      if (err) {
        console.log(err);
        return res.send("error updating user");
      }
      res.redirect("/user");
    });
  });
});

//add new user
app.get("/user/new",(req,res)=>{
  res.render("new.ejs");
});

app.post("/newUser",(req,res)=>{
  let {username,email,password}=req.body;
  let id=uuidv4();
  let q=`insert into user (id,username,email,password) values('${id}','${username}','${email}','${password}')`;

  try{
    connection.query(q,(err,result)=>{
      if (err) throw err;
      console.log("added new user");
      res.redirect("/user");
    });
  }catch(err){
    res.send("some error occured");
  }
});

//delete a user if they enter correct email id and password
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});


app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(result);

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.listen(8080,()=>{
  console.log("server is listening to 8080");
});