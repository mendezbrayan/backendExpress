import { notFound } from "@hapi/boom";
import db from "../models/index.js";
const { Notas, User } = db;

class NotaService {
  async create(data) {
    const user = await User.findByPk(data.idUser)
    if(!user){
       throw notFound('Usuario Not Found')
    }
    const nota = await Notas.create({
        nota: data.nota,
        idUser: user.id
    })
    return nota
  }

  async all() {
    const nota = await Notas.findAll({
      attributes: { exclude: ["idUser"] },
     
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "status", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    return nota;
  }

  async findOne(id) {
    const nota = await Notas.findByPk(id,{
        attributes:{exclude: ['idUser']},
        include:[
            {
                model: User
            }
        ]
    });
    if (!nota) {
      throw notFound("Nota Not Found");
    }
    return nota;
  }

  async update(idNota,data) {

      const user = await User.findByPk(data.idUser);
     if(!user){
      throw notFound("Nota Not Found");

     }
     const nota = await Notas.findByPk(idNota);

      if(!nota){
        throw notFound("Nota Not Found");
      }
      nota.nota = data.nota;
      nota.idUser = user.id
    await  nota.save();
      return nota;

  
  }

  async delete(id) {
  
    const nota = await Notas.findByPk(id);
    await nota.destroy();
    return nota;
  }
}

export default NotaService;
