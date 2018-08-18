import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: mongoose.Schema.Types.ObjectId,
});

const post = mongoose.model('Post', postSchema);

export default post;
