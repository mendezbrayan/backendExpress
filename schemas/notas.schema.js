// import UserService from "./../services/users.service.js";
// const service = new UserService()

import Joi from "joi"

const id =  Joi.number()
const nota = Joi.number().min(0).max(100)
const idUser = Joi.number()

const createNotaSchema = Joi.object({
    nota : nota.required(),
    idUser: idUser.required()
 

})

const getNotaSchema = Joi.object({
   id : id.required()
    // id: id.required().custom((value,helper) => {
    //  const userFound = service.users.find((item) => item.id === value)
    // if(userFound){
    //     return helper.message('No existe el usuario')
    // }
    //  return true
    // })
      
})

const UpdateNotaSchema = Joi.object({
    nota : nota.required(),
    idUser : idUser.required(),
})

export {createNotaSchema,getNotaSchema,UpdateNotaSchema}