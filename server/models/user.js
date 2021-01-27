const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create a schema
const userSchema = new Schema({
    //Method used for authentication
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
      email: {
        type: String,
        lowercase: true
    },
    password: {
        type: String
    }
    },
    google: {
        //2 IDs for Google - One thats stored at Google and other for Mongo
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
 id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }
});

//Before user document is saved, hash password
userSchema.pre('save', async function(next) {
    try {
        //Execute it only if method is not local
        if (this.method != 'local') {
            next();
        }
        //Generate a salt
        const salt = await bcrypt.genSalt(10);
        //Generate hashed pwd - salt +hash
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        //Assign hashed password
        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}
//create a model
const User = mongoose.model('user', userSchema);

//export a model
module.exports = User;