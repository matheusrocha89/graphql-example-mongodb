import omitBy from 'lodash/omitBy';
import { Post, Author } from '../models';

const createPost = async (_, { authorId, title, content }, { pubsub }) => {
  try {
    const postToSave = {
      authorId,
      title,
      content,
    };

    const newPost = await Post.create(postToSave);
    const author = await Author.findByIdAndUpdate(
      authorId,
      { $push: { posts: newPost.id } },
    ).exec();
    pubsub.publish('postAdded', { postAdded: newPost });
    const postData = newPost.toObject();
    return {
      ...postData,
      id: newPost.id,
      postedBy: author,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const updatePost = async (_, { id, title = null, content = null }) => {
  try {
    const newPostValues = omitBy({ title, content }, value => !value);
    const updatedPost = await Post.findByIdAndUpdate(id, newPostValues, { new: true }).exec();
    return updatedPost;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deletePost = async (_, { id, authorId }) => {
  try {
    await Post.findByIdAndRemove(id).exec();
    await Author.findByIdAndUpdate(
      authorId,
      { $pullAll: { posts: [id] } },
      { new: true },
    ).exec();
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

const createAuthor = async (_, { name }) => {
  try {
    const newAuthor = await Author.create({ name });
    return newAuthor;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateAuthor = async (_, { id, name }) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(id, { name }, { new: true }).exec();
    return updatedAuthor;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteAuthor = async (_, { id }) => {
  try {
    await Author.findByIdAndRemove(id).exec();
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default {
  createPost,
  updatePost,
  deletePost,

  createAuthor,
  updateAuthor,
  deleteAuthor,
};
