
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
    clientSecret: googleClientSecret, 
    callbackURL: '/auth/google/callback',
    proxy: true
},
async (accessToken, refreshToken, profile, done ) =>{
const existingUser = await User.findOne({googleID: profile.id})
if(existingUser){
done(null, existingUser)
}
    const user = await new User({googleID: profile.id}).save()
     done(null, user);




}));



// async function fetchAlbums(){
//     const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums")
//     const json = await res.json()
// console.log(json)
// }

// fetchAlbums();



// const fetchAlbums = async () => {
//     const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums")
//     const json = await res.json()
// console.log(json)
// }

// fetchAlbums();