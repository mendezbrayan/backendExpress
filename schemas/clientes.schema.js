
import Joi from 'joi'
const id = Joi.string()
const name = Joi.string().min(3).max(15) 
const lastname = Joi.string().min(3).max(15)
const address = Joi.string().min(10).max(20)
const type = Joi.string()

const createClienteSchema = Joi.object({
name: name.required(),
lastname: lastname.required(),
address: address.required(),

})

const getClienteSchema = Joi.object({
    id: id.required()
})

const UpdateClienteSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    address: address.required(),
})

export {createClienteSchema,getClienteSchema,UpdateClienteSchema} 
