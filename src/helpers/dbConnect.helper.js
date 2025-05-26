import { connect } from "mongoose";

class DatabaseConnect {
  constructor(url) {
    this.url = url;
    if (typeof DatabaseConnect.instance === "object") {
      //console.log("mongo already connected");
      return DatabaseConnect.instance;
    } else {
      //console.log("mongo connected");
      DatabaseConnect.instance = this;
      return this;
    }
  }
  dbConnect = async (link) => {
    try {
      await connect(link);
     console.log("mongo connected");
    } catch (error) {
      throw error;
    }
  };
}

export default DatabaseConnect;
