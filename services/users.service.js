import { notFound } from "@hapi/boom";
import db from "../models/index.js";
const { User } = db;

class UserService {
async create(data) {
    try {
    const newUser = await User.create({
        ...data,
        status: true,
    });
    return newUser;
    } catch (error) {
    return error;
    }
}

async all() {
    const user = await User.findAll();
    return user;
}

async findOne(id) {
    const user = await User.findByPk(id);
    if (!user) {
    throw notFound("User Not Found");
    }
    return user;
}

async update(id, { name, lastname, password }) {
    try {
const user = await User.findByPk(id);
(user.name = name),
        (user.lastName = lastname),
        (user.password = password ? password : user.password);
user.save();
    return user;
    } catch (error) {
    throw notFound("User Not Found");
    }
}

async delete(id) {
    const user = await User.findByPk(id);
    user.destroy();

    return user;
}
}

export default UserService;
