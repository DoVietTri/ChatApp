import mongoose from "mongoose";
import bcrypt from 'bcrypt'; 

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username : String,
    gender   : {type: String, default: 'male'},
    phone    : {type: Number, default: null},
    address  : {type: String, default: null},
    avatar   : {type: String, default: 'avatar-default.jpg'},
    role     : {type: String, default: 'user'},
    local    : {
        email       : {type: String, trim: true},
        password    : String,
        isActive    : {type: Boolean, default: true},
        verifyToken : String
    },
    facebook : {
        uid         : String, 
        token       : String,
        email       : {type: String, trim: true}
    },
    google   : {
        uid         : String, 
        token       : String,
        email       : {type: String, trim: true}
    },
    createdAt  : {type: Number, default: Date.now},
    updatedAt  : {type: Number, default: Date.now},
    deleteddAt : {type: Number, default: Date.now},
});

UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    findByEmail(email) {
        return this.findOne({'local.email': email}).exec();
    },

    removeById(id) {
        return this.findByIdAndRemove(id).exec();
    },

    findUserById(id) {
        return this.findById(id).exec();
    },

    findByFacebookUid(uid) {
        return this.findOne({'facebook.uid': uid}).exec();
    }
}

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.local.password); //return a promise has result true or false
    }
}

module.exports = mongoose.model("user", UserSchema);
