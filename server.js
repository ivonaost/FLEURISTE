const express = require('express');
const mysql = require('mysql');
const app = express();

const bodyParser = require('body-parser');
var session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());


// Create connection
// query koji moramo upisat u mysql workbench
// ALTER USER 'ode_ide_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ode_ide_password'
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employeedb'
});

// Create sessions?
app.use(session({
  secret: '1354grdfsiojg874',
  resave: true,
  saveUninitialized: false
}));

// Connect to db
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

// dohvacanje vrsta cvijeca iz baze
app.get('/api/flowers', (req, res) => {
  let sql = 'SELECT * FROM flowers';
  let query = db.query(sql, (err, flowers) => {
    if (err) throw err;
    console.log(flowers);
    res.json(flowers);
  });
});

// dohvacanje buketa iz baze
app.get('/api/bouquets', (req, res) => {
  let sql = 'SELECT * FROM bouquet ORDER BY idbouquet DESC';
  let query = db.query(sql, (err, bouquet) => {
    if (err) throw err;
    console.log(bouquet);
    res.json(bouquet);
  });
});


// prijava korisnika
app.post('/login', function(req, res) {
  var message = '';
  var sess = req.session;

  if(req.method == "POST"){
     var post  = req.body;
     var name= post.username;
     var pass= post.password;
   
     var sql="SELECT * FROM `users` WHERE `username`='"+name+"' and password = '"+pass+"'";                          
     db.query(sql, function(err, results){     
      if(results[0].username && results[0].password){
           req.session.uniqueID = results[0].username;
           req.session.user = results[0];
           console.log(req.session);
           res.redirect('http://localhost:5000/user');
      }   
      else if(err){
        res.send(err);
      }   
     });
  } else {
     res.render({message: message});
  }        

});

app.get('/user',(req,res)=>{
  console.log("sesija: "+req.session.uniqueID)
  if(req.session.uniqueID)
    {
      console.log("im in");
      res.redirect('http://localhost:3000/profile');
    }
  else
      res.redirect('http://localhost:3000/');
});

app.get('/finduser',(req,res)=>{
  console.log("sesija: "+req.session.user)
  if(req.session.user)
    {
      console.log("im in");
      res.json(req.session.user);
    }
  else
      res.json({});
});

// odjava korisnika
app.post('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/');
});


//dodaj u kosaricu 
var cookieCounter = 0;
app.post('/addtocart',function(req,res){
  var bouquetName = 'bouquetName'+cookieCounter;
  var bouquetPrice = 'bouquetPrice'+cookieCounter;
  cookieCounter++;
  if(req.body.bouquetName && req.body.bouquetPrice){
     res.cookie(bouquetName, req.body.bouquetName);
     res.cookie(bouquetPrice, req.body.bouquetPrice);
     console.log("Buket "+req.body.bouquetName+". Cijena: "+req.body.bouquetPrice);    
     res.redirect('/buket/'+req.body.bouquetName);             
  } 
});

//promijeni broj kosarice
app.get('/cartnumber',function(req,res){
    res.json({'cartNumber': cookieCounter});
});


//naruci proizvod
app.post('/buyproduct',function(req,res){
  if(req.body.bouquetName && req.body.bouquetPrice){
     res.cookie('bouquetName', req.body.bouquetName);
     res.cookie('bouquetPrice', req.body.bouquetPrice);
     console.log("Buket "+req.body.bouquetName+". Cijena: "+req.body.bouquetPrice);    
     res.redirect('http://localhost:3000/profile');             
  } 
});

//izlistaj proizvode u kosarici
var cookies = [];
var bouquets = [];
app.get('/shoppingcart',function(req,res){

  cookies = [];
  var i=0;

  for(cookie in req.cookies){  
    console.log(Object.keys(req.cookies)[i]+" : "+Object.values(req.cookies)[i])
    cookies.push({ "name" : Object.keys(req.cookies)[i], "value": Object.values(req.cookies)[i]} )
    i++;  
  }

  i=0;
  bouquets = cookies.filter(c => {
    if(c.name=="bouquetName"+i)
      {
        i++;
        return c;
      }
  });
  cookieCounter = 0;

  console.log(bouquets);
  res.json(bouquets);
});

// naruci buket/e
app.post('/order',function(req,res){
  var price = 0;
  var i=0;
  
  cookies.filter(c => {
    if(c.name=="bouquetPrice"+i)
    {
      price += parseInt(c.value);
      res.clearCookie(c.name);

      bouquets.filter(b => {
        if(b.name ==="bouquetName"+i )
          {
            var sql="INSERT INTO orders (user,title,price) VALUES ('"+req.session.uniqueID+"', '"+b.value+"','"+c.value+"' )";                      
            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log(b.name);
              });
          }
          return b;
      });

      i++;
      return c;
    }
    else if(c.name=="bouquetName"+i){
      res.clearCookie(c.name);
      return c;
    }
  });

  console.log(price);
  res.redirect('/');
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);