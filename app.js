const express = require('express');
const app = express();
const router = express.Router();
const db = require('./db');
const agenda = require('./routes/agenda');
const login = require('./routes/login');
const portfolio = require('./routes/portfolio');

const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

// Código para Login
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser('tecsup'));
app.use(session({
  secret:'tecsup',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(function(username, password, done){
  //done(err,{"Francisco"})
  if(username=="francisco.ramirez@tecsup.edu.pe" && password=="tecsup")
    return done(null,{id: 1, name:"Francisco"});
  
  done(null, false);
}));

//serialización
passport.serializeUser(function(user, done){
  done(null, user.id);
});

// deserialización
passport.deserializeUser(function(id,done){
  done(null, {id: 1, name: "Francisco"});
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local',{
  successRedirect: '/agenda/getagenda',
  failureRedirect: '/login'
}));

const path = __dirname + '/views/';
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));
app.use('/agenda', agenda);
//app.use('/login', login);
app.use('/portfolio', portfolio);

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});