import { notFound } from "@hapi/boom";
import db from "../models/index.js";
const { Cliente } = db;

class ClienteService {

async create(data) {
    try {
    const newCliente = await Cliente.create({
        ...data,
        status: true,
        type: "Corporativo"
    });
    return newCliente;
    } catch (error) {
    return error;
    }
}

async all() {
    const cliente = await Cliente.findAll();
    return cliente;
}

async findOne(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
    throw notFound("Cliente Not Found");
    }
    return cliente;
}

async update(id, { name, lastname, address }) {
    try {
const cliente = await Cliente.findByPk(id);
        cliente.name = name,
        cliente.lastname = lastname,
        cliente.address = address ;
    cliente.save();
    return cliente;
    } catch (error) {
    throw notFound("Cliente Not Found");
    }
}

async delete(id) {
    const cliente = await Cliente.findByPk(id);
    cliente.destroy();

    return cliente;
}
}

export default ClienteService;
