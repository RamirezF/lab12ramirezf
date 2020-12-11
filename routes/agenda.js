const express = require('express');
const router = express.Router();
const path = require('path');
const contactos = require('../controllers/contactos');
const passport = require('passport');

router.get('/', function(req, res){
    res.redirect('/agenda/getagenda');
});

router.get('/create', (req, res, next)=>{
    if(req.isAuthenticated() ) return next();
    res.redirect('/login');
}, function(req, res){
    res.sendFile(path.resolve('views/agenda/create.html'));
});

router.post('/addcontacto', (req, res, next)=>{
    if(req.isAuthenticated() ) return next();
    res.redirect('/login');
}, function(req, res){
    contactos.create(req,res);
});

router.get('/getagenda', (req, res, next)=>{
    if(req.isAuthenticated() ) return next();
    res.redirect('/login');
}, function(req, res){
    contactos.list(req, res);
});

// Por mejorar
router.get('/getone/:id', (req, res, next)=>{
    if(req.isAuthenticated() ) return next();
    res.redirect('/login');
}, function(req, res){
    contactos.detail(req, res);
});

router.get('/delete/:id', (req, res, next)=>{
    if(req.isAuthenticated() ) return next();
    res.redirect('/login');
}, function(req,res){
    console.log(req.params);
    contactos.delete(req, res);
});

router.get('/edit/:id', (req, res, next)=>{
    if(req.isAuthenticated() ) return next();
    res.redirect('/login');
}, function(req, res){
    contactos.edit(req, res);
});

router.post('/:id', (req, res, next)=>{
    if(req.isAuthenticated() ) return next();
    res.redirect('/login');
}, function(req, res){
    console.log('entró a post para editar');
    contactos.update(req,res);
})

module.exports = router;