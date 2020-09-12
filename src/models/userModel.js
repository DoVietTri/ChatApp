import mongoose from "mongoose";
import bcrypt from 'bcrypt'; 

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username : String,
    gender   : {type: String, default: 'male'},
    phone    : {type: String, default: null},
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
    },

    findByGoogleUid(uid) {
        return this.findOne({'google.uid': uid}).exec();
    },

    updateUser(id, item) {
        return this.findByIdAndUpdate(id, item).exec(); //return old item after update
    },

    updatePassword(id, hashedPassword) {
        return this.findByIdAndUpdate(id, {'local.password': hashedPassword}).exec();
    },

    /**
     * Find all users for add contact
     * @param {array} deprecatedUserIds 
     * @param {string} keyword 
     */
    findAllForContact(deprecatedUserIds, keyword) {
        return this.find({
            $and: [
                {'_id': {$nin:deprecatedUserIds}},
                {'local.isActive': true},
                {$or: [
                    {'username': {'$regex': new RegExp(keyword, 'i')}},
                    {'local.email': {'$regex': new RegExp(keyword, 'i')}},
                    {'facebook.email': {'$regex': new RegExp(keyword, 'i')}},
                    {'google.email': {'$regex': new RegExp(keyword, 'i')}}
                ]}
            ]
        }, {_id: 1, username: 1, address: 1, avatar: 1}).exec();
    }   
}

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.local.password); //return a promise has result true or false
    }
}

module.exports = mongoose.model("user", UserSchema);
