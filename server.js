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
  db.query(sql, (err, flowers) => {
    if (err) throw err;
    res.json(flowers);
  });
});

// dohvacanje buketa iz baze
app.get('/api/bouquets', (req, res) => {
  let sql = 'SELECT * FROM bouquet ORDER BY idbouquet DESC';
  db.query(sql, (err, bouquet) => {
    if (err) throw err;
    console.log(bouquet);
    res.json(bouquet);
  });
});

// dohvacanje buketa iz baze
app.get('/api/myorders', (req, res) => {
  let sql = " SELECT * FROM orders WHERE user = '"+req.session.uniqueID+"' ";
  db.query(sql, (err, orders) => {
    if (err) throw err;
    console.log(orders);
    res.json(orders);
  });
});


// prijava korisnika
app.post('/login', function(req, res) {
  var message = '';

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
      res.json(req.session.user);
    }
  else
      res.json({});
});

// odjava korisnika
app.post('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/profile');
});

// Globalne varijable: 
//  - cookieCounter: brojac cookija
//  - cartCounter: brojac buketa u kosarici
//  - bouquets: niz buketa u kosarici
var cookieCounter = 0;
var cartCounter = 0;
var bouquets = [];

// Dodaj u kosaricu 
app.post('/addtocart',function(req,res){
  var bouquetName = 'bouquetName'+cookieCounter;
  var bouquetPrice = 'bouquetPrice'+cookieCounter;
  cookieCounter++;
  cartCounter++;
  if(req.body.bouquetName && req.body.bouquetPrice){
     res.cookie(bouquetName, req.body.bouquetName);
     res.cookie(bouquetPrice, req.body.bouquetPrice);
     console.log("Buket "+req.body.bouquetName+". Cijena: "+req.body.bouquetPrice);    
     bouquets.push({ 
      "name" :bouquetName,
      "value": req.body.bouquetName,
      "priceTag": bouquetPrice,
      "price": req.body.bouquetPrice });
     res.redirect('/kosarica');             
  } 
});

// Promijeni broj buketa u kosarici
app.get('/cartnumber',function(req,res){
    res.json({'cartNumber': cartCounter});
});


// Naruci proizvod
app.post('/buyproduct',function(req,res){
  if(req.body.bouquetName && req.body.bouquetPrice){

     res.cookie('bouquetName', req.body.bouquetName);
     res.cookie('bouquetPrice', req.body.bouquetPrice);

     console.log("Buket "+req.body.bouquetName+". Cijena: "+req.body.bouquetPrice);    

     res.redirect('http://localhost:3000/profile');             
  } 
});

// Izlistaj proizvode u kosarici
app.get('/shoppingcart',function(req,res){
  res.json(bouquets);
});

// Naruci buket/e
app.post('/order',function(req,res){

  bouquets.map( bouquet => {
    var sql="INSERT INTO orders (user,title,price) VALUES ('"+req.session.uniqueID+"', '"+bouquet.value+"','"+bouquet.price+"' )";                      
    db.query(sql, function (err, result) {
      if (err) throw err;    
      console.log("Uspjesno dodano: " + bouquet);
    });
    return 1;
  });

  cookieCounter = 0;
  cartCounter = 0;
  bouquets = [];
  res.redirect('/profile');
})

// Izbrisi narudzbu
app.post('/deleteorder',function(req,res){

  var newBouquetsList = [];
  newBouquetsList = bouquets.filter( bouquet => bouquet.name != req.body.deleteCookie );
  bouquets = newBouquetsList;
  cartCounter--;

  res.redirect('/kosarica');
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);