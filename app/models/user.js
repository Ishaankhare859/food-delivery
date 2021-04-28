const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // cart: { type: Object,default: {items: {},
    //          totalQty: 0,
    //       totalPrice: 0,
    //       dishId:{

    //         type: mongoose.Schema.Types.ObjectId,
    //          ref: 'menu',
    //          required: true
    //     }} },
    items:{type: Object},
    role: { type: String, default: 'customer' }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)