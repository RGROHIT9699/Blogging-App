const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router()



router.get('/register' , (req,res)=>{
    res.render('auth/signup');
})

router.post('/register' , async(req,res)=>{
    try{
        let {email,password,username} = req.body;
        const user = new User({email,username})
        const newUser = await User.register(user , password );
        req.login( newUser , function(err){
            if(err){return next(err)}
            req.flash('success' , 'welcome,  you are registed succesfully');
            return res.redirect('/blogs');
        })
    }
    catch(e){
        req.flash('error' , e.message);
        return res.redirect('/signup');
    }
})


router.get('/login' , (req,res)=>{
    res.render('auth/login');
})

router.post('/login', 
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        failureMessage: true 
    }),
    (req,res)=>{
        req.flash('success' , 'welcome back')
        res.redirect('/blogs');
    }
)


router.get('/logout' , (req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success' , 'goodbye friends, see you again')
    res.redirect('/login');

})

module.exports = router;