import { Author, Post } from '../models';

const post = async (parent, { id }) => {
  try {
    const loadedPost = await Post.findById(id).exec();
    return loadedPost;
  } catch (e) {
    throw new Error(e.message);
  }
};

const feed = async () => {
  try {
    const allPosts = await Post.find().exec();
    return allPosts;
  } catch (e) {
    throw new Error(e.message);
  }
};

const author = async (parent, { id }) => {
  try {
    const loadedAuthor = await Author.findById(id).exec();
    const authorPosts = await Post.find({
      _id: { $in: loadedAuthor.posts },
    }).exec();
    const authorData = loadedAuthor.toObject();
    return {
      ...authorData,
      id: loadedAuthor.id,
      posts: authorPosts,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const authors = async () => {
  try {
    const loadedAuthors = await Author.find().exec();
    const allAuthors = [];
    await Promise.all(loadedAuthors.map(async (authorFromList) => {
      const authorPosts = await Post.find({
        _id: { $in: authorFromList.posts },
      }).exec();
      allAuthors.push({
        ...authorFromList.toObject(),
        id: authorFromList.id,
        posts: authorPosts,
      });
    }));

    return allAuthors;
  } catch (e) {
    throw new Error(e.message);
  }
};

const postsFromAuthor = async (parent, { authorId }) => {
  try {
    const posts = await Post.find({ authorId }).exec();
    return posts;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default {
  post,
  feed,
  author,
  authors,
  postsFromAuthor,
};
