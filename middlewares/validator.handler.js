import { badRequest } from "@hapi/boom"

const validatorHandler = (schema,property) => {
    return (req,res,next) => {
    const data = req[property]
    const {error} = schema.validate(data,{abortEarly:false})
   if(error){
  next(badRequest(error))
   }else{
    next()
   }
    }
}

export default validatorHandler