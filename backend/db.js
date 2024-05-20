const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://arnavPersonal:KgO6TxYUxTh3o9z8@cluster0.nohby6q.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    firstName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password:{
        type: String,
        required: true,
        minLength: 7
    }
});

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
};