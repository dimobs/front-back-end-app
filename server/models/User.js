const { Schema, model } = require('mongoose');
// const { Schema, model, Types: {ObjectId} } = require('mongoose');



const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    firstName: { type: String, require: false },
    lastName: { type: String, require: false },
    phoneNumber: { type: String, require: false },
    gender: { type: String, required: false, enum: ['male','female']},
    bio: {type: String, require: false},
    profileImg: {type: String, require: false},
    created: { type: Date, default: Date.now}
 // pays: {type: [ObjectId], ref: 'Pay', default: []},
    // trips: {type: [ObjectId], ref: 'Trip', default: []}
});

userSchema.index({ email: 1 }, {
    collation: {
        //keys insensitive
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;