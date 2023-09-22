import mongoose from "mongoose";

export const dbconect = async () => {
  const conn = await mongoose.connect(process.env.mongodburldev);

  if (conn) console.log(`dbconect on ${conn.connection.host}`.underline.blue);
};
