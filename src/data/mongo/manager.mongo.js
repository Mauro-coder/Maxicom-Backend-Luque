import mongoose from "mongoose";

class Manager {
  constructor(model) {
    this.model = model;
  }
  create = async (data) => {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readAll = async (filter) => {
    try {
      const all = await this.model.find(filter).lean();
      return all;
    } catch (error) {
      throw error;
    }
  };

  readById = async (id) => {
    try {
      const one = await this.model.findById(id).lean();
      return one;
    } catch (error) {
      throw error;
    }
  };
  readOne = async (filter) => {
    try {
      if (typeof filter === "string" && mongoose.Types.ObjectId.isValid(filter)) {
        filter = { _id: new mongoose.Types.ObjectId(filter) };
      }
      const one = await this.model.findOne(filter).lean();
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateById = async (id, data) => {
    try {
      const opts = { new: true };
      const one = await this.model.findOneAndUpdate({ _id: id }, data, opts);
      return one;
    } catch (error) {
      throw error;
    }
  };
  // updateOne = async (filter, data) => {
  //   try {
  //     const opts = { new: true };
  //     const one = await this.model.findOneAndUpdate(filter, data, opts);
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  destroyById = async (id) => {
    try {
      const one = await this.model.findOneAndDelete({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  };
  // destroyOne = async (filter) => {
  //   try {
  //     const one = await this.model.findOneAndDelete(filter);
  //     return one;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  paginate = async(page, limit)=> {
    try {
      const all = await this.model.paginate({}, {page, limit})
      return all
    } catch (error) {
      throw error
    }
  }
}

export default Manager;