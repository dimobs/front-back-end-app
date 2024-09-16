const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    firstName: { type: String, require: false, max: [15, "Max length should be less than 16"] },
    lastName: { type: String, require: false },
    bio: {type: String, require: false},

});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;