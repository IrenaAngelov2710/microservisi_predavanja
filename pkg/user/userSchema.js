const mongoose = require('mongoose');
//* npm install validator - biblioteka za validacii
const validator = require('validator');
//* npm install bcryptjs - biblioteka za kriptiranje na password-ot
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String, 
        required: [true, 'Email is required'],
        lowercase: true, // site bukvi da se mali
        unique: true, // sekoj email da e unikaten
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password must be at least 4 characters'],
        // validate: [validator.isStrongPassword, 'Please provide a strong password'],
    },
    admin: {
        type: Boolean,
        default: false,
      },
});

// this se odnesuva na objektot sto e kreiran (userSchema)

userSchema.pre('save', async function (next) {
    //! AKO NE E PROMENET PASSWORD-OT
    if (!this.isModified('password')) {
        //! SLEDNO - ovde zapira f-jata i ne se izvrsuva toa sto e nadolu
        return next();
        //? AKO E PROMENET PASSWORD-OT ILI IMAME PASSWORD NEKAKOV
    } else {
        //? togas se koristi else-ot ili se hasira password-ot so jacina 12
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

 
