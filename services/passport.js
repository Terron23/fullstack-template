
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const googleClientID = keys.googleClientID
const googleClientSecret = keys.googleClientSecret
const User = mongoose.model('users');


passport.serializeUser((user, done)=>{
done(null, user.id)
});

passport.deserializeUser((id, done)=>{
User.findById(id)
.then((user)=>{
done(null, user);
})
});

passport.use(new GoogleStrategy({
    
    clientID: googleClientID,
    clientSecret: googleClientSecret, //"zaM_CAglF6dLM2YDpNRTwXMk",//keys.googleClientsecret,
    callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done ) =>{
// console.log("accestoken", accessToken);
// console.log("refreshToken", refreshToken);
// console.log("profile", profile);
// console.log("done", done);
// console.log(keys.googleClientID);
// console.log(keys.googleClientSecret);
User.findOne({googleID: profile.id})
.then((existingUser)=>{
if(existingUser){
done(null, existingUser)
}
else{
    new User({
        googleID: profile.id
    }).save()
    .then((user)=> done(null, user));
}
})



}));