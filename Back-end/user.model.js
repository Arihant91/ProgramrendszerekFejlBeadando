const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    email: { type: String, required: true},
    accessLevel: { type: String}
}, {collection: 'users'});

userSchema.pre('save', function(next) {
    const user = this;
    if(user.isModified('password')){
        user.accesLevel = 'basic';
        bcrypt.genSalt(10, function(error, salt) {
            if(error){
                console.log('hiba a salt generalasa soran');
                return next(error);
            }
            bcrypt.hash(user.password, salt, function(error, hash){
                if(error) {
                    console.log('hiba a hasheles soran');
                return next(error);  
                }
                user.password = hash;
                return next();
            })
        })
    } else {
        return next();
    }
})

userSchema.methods.comparePasswords = function(password, nxt){
    bcrypt.compare(password, this.password, function(err, isMatch) {
        nxt(err, isMatch);
    })
}

mongoose.model('user', userSchema);