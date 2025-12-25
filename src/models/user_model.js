const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        validate: [
            function (email) {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(email)
            }, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v); // Example: at least one uppercase, one lowercase, one number, min 8 chars
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.'
        }
    },
    address: {
        type: String,
        trim: true,
    },
    tel: {
        type: String,
    },
    avatar: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        default: "inactive",
        enum: ["active", "inactive"]
    },
    group_user: {
        type: Schema.Types.ObjectId,
        ref: 'group_users', //phải trùng với tên collection 
    },

    resetToken: { type: String },
    resetTokenExpire: { type: Number },

},
    {
        timestamps: true,
    })

userSchema.pre('save', function (next) {
    let hashPassword = bcrypt.hashSync(this.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
    });
    this.password = hashPassword;
    next();

})


// userSchema.add({
//     resetToken: { type: String },
//     resetTokenExpire: { type: Number },
// });

module.exports = model('users', userSchema);