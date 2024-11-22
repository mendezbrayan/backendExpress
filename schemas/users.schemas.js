// import UserService from "./../services/users.service.js";
// const service = new UserService()

import Joi from "joi"

const id =  Joi.string()
const name = Joi.string().min(3).max(15) 
const lastname = Joi.string().min(3).max(15)
const password = Joi.string().alphanum().min(3).max(10)
const status = Joi.boolean()
const created_at = Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).messages({'string.pattern.base':'La fecha debe tener el formato completo YYYY-MM-DD'})

const createUseSchema = Joi.object({
    name : name.required(),
    lastname : lastname.required(),
    password : password.required(),

})

const getUserSchema = Joi.object({
   id : id.required()
    // id: id.required().custom((value,helper) => {
    //  const userFound = service.users.find((item) => item.id === value)
    // if(userFound){
    //     return helper.message('No existe el usuario')
    // }
    //  return true
    // })
      
})

const UpdateUserSchema = Joi.object({
    name : name.required(),
    lastname : lastname.required(),
    password : password,
})

export {createUseSchema,getUserSchema,UpdateUserSchema}