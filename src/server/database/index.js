import mongoose from 'mongoose';

const { DB_URI } = process.env;

export default async () => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true });
    // eslint-disable-next-line no-console
    console.log('DB ready');
  } catch (e) {
    throw new Error(e.message);
  }
};
