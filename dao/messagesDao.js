import menssageSchema from "./models/menssageSchema.js";

class Messages {
    static createMessage(body) {
        return menssageSchema.create(body);
      }

    static getMessages() {
        return menssageSchema.find()
    }


    static getMessageById(id) {
        return menssageSchema.findById(id)
    }



    static updateMById(id, data) {
        return menssageSchema.updateOne({ _id: id }, { $set: data })
    }

    static deleteM(id) {
        return menssageSchema.deleteOne({ _id: id })
    }


}

export default Messages