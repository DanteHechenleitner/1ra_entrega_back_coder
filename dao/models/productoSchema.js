import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const product = new mongoose.Schema ({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    code: { type: Number, require: true, unique: true },
    description: { type: String, require: true },
    thumbnail: { type: String },
    stock: { type: Number, require: true },
    }, { timestamps: true }
)

product.plugin(mongoosePaginate)

export default mongoose.model('Product', product)
