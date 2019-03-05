const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
const app = express ()

var GitHubStrategy = require('passport-github').Strategy;

const User = [];



app.use(cookieSession({
    maxAge:24*60*60,
    keys:"this is alok"
}))
app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    done(null,User[0]);
})

passport.use(new GitHubStrategy({
    clientID: 'put your clientId',
    clientSecret: 'put your clientSecret',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      User.push(profile);
      cb(null,profile)
  }
));

  app.get('/',(req,res,next)=>{
      res.send("welcome to home page");
  })
  app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send(req.user);
  });

  app.listen(3000, ()=>{
      console.log("server is started at 3000 port")
  })


