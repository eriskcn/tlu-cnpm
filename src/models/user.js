const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongooseSequence = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["member", "admin"],
        required: true
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.plugin(mongooseSequence, { inc_field: "userId" });

const User = mongoose.model("User", userSchema);
module.exports = User;
