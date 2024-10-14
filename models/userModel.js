import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  additional_info: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

const User = mongoose.model('User', userSchema);
export default User;
