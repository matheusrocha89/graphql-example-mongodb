import mongoose from 'mongoose';

const { Schema } = mongoose;

export const authorSchema = new Schema({
  name: String,
  posts: [Schema.Types.ObjectId],
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
