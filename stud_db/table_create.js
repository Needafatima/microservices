var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "studInfo"
});


con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE student (name varchar(30),SRN int(5),roll int(5),sem int(5),count int(5),cnames varchar(100),ccodes varchar(100))";
    con.query(sql, function(err,result){
        if(err) throw err;
        console.log("Table student created");
    });
});