var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
const { group } = require('console');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
//---------------------------------------------//
   var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "studInfo"
});

app.get('/', function (req, res) {
    var index = fs.readFileSync('index.html');
    res.send(index.toString());
})

app.get('/send', function (req, res) {
    var myform = fs.readFileSync('myform.html');
    res.send(myform.toString());
})

app.get('/ret', function (req, res) {
    var myform = fs.readFileSync('retrive.html');
    console.log(myform.body.sname)
    res.send(myform.toString());
})

app.post('/search', urlencodedParser, function(req,res){
    app.use(urlencodedParser);
    var srn = req.body.srn;
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    con.query("SELECT name,roll,sem,count,cnames,ccodes FROM student WHERE srn=" + mysql.escape(srn), function (err, result, fields) {
       if (err) throw err; 
        res.write("rec found");
       });
       console.log(result);
       res.end();
})

app.post('/insert', urlencodedParser, function(req,res){
    app.use(urlencodedParser);
    var sname = req.body.sname;
    var srn = req.body.srn;
    var rollno = req.body.rollno;
    var semno = req.body.semno;
    var ccount = req.body.ccount;
    var cname = req.body.cname;
    var ccode = req.body.ccode;
    rollno = parseInt(rollno);
    semno = parseInt(semno);
    ccount = parseInt(ccount);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    con.query("INSERT INTO `student` (`name`,`SRN`,`roll`,`sem`,`count`,`cnames`,`ccodes`) VALUES ('"+sname+"','"+srn+"',"+rollno+","+semno+","+ccount+",'"+cname+"','"+ccode+"')", function (err, result) {
       if (err) throw err; 
        res.write("rec inserted");
       });
       res.write("record inserted");
       res.end();
})

app.post('/test', function(req,res){
  console.log("OKAY!!!!!!!!!")
})

app.listen(9000);