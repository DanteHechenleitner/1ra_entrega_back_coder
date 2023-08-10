import userSchema from "./models/userSchema.js";

class Users {
    static createUser(user) {
        return userSchema.create(user)
    }

    static getUsers() {
        return userSchema.find()
    }

    static getUsersData() {
        return userSchema.map(firts_name, last_name, email, role)
    }

    static getUserById(id) {
        return userSchema.findById(id)
    }

    static getUserLog(email) {
        return userSchema.findOne(email)
    }

    static updateUserById(id, data) {
        return userSchema.updateOne({ _id: id }, { $set: data })
    }

    static deleteUser(id) {
        return userSchema.deleteOne({ _id: id })
    }

    static deleteInactive(filter) {
        return userSchema.deleteMany(filter);
    }

    static lastConnection(last_connection) {
        return userSchema.find(last_connection)
    }


    static getUserPremium(email, role) {
        return userSchema.findOne(email, role)
    }


    /* static getUserByEmail(email) {
         return userModel.findOne({email: email})
     }
 
     static updatePassword(id, data) {
         return userModel.updateOne({_id: id}, {password: data})
     }*/

}

export default Users