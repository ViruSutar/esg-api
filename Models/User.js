const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: new Date() }
})


// hash password
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

module.exports=mongoose.model('users',UserSchema);
