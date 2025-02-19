import User from "./models/users.model.js";
import Manager from "./manager.mongo.js";

const usersManager = new Manager(User);

export default usersManager;