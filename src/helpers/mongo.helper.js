import { connect } from "mongoose";

const connectMongo = async (link) => {
  try {
    await connect(link);
    console.log("mongo connected");
  } catch (error) {
    throw error;
  }
};

export default connectMongo;