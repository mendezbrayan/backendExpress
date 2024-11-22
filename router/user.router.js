import express  from "express";
import UserService from "./../services/users.service.js";
import validatorHandler from '../middlewares/validator.handler.js'
import { createUseSchema,getUserSchema,UpdateUserSchema } from "../schemas/users.schemas.js";
const router = express.Router();

const service = new UserService()

router.use(express.json());

router.get("/", async(req, res,next) => {
  try {
    const users = await service.all()

  res.json(users);
  } catch (error) {
    next(error)

  }
  
});

router.get("/:id",
validatorHandler(getUserSchema,'params'),
async (req, res,next) => {
  try {
    const {id} = req.params
      const user = await service.findOne(parseInt(id))
      res.status(200).json(user)

  } catch (error) {
    next(error)
    
  }
});

router.post('/', 
validatorHandler(createUseSchema,'body'),
async(req, res,next) => {
  
 try {
    let newUser = await service.create(req.body)
  res.status(201).json(newUser);

  } catch (error) {
    next(error)
  }
 
});

router.put('/:id',
validatorHandler(getUserSchema,'params'),
validatorHandler(UpdateUserSchema,'body'),
 async (req, res,next) => {
  try {
    const {id} = req.params
   let userUpdate = await service.update(parseInt(id),req.body)
  res.status(200).json(userUpdate);

  } catch (error) {
    next(error)
    
  }
  
});

router.delete('/:id', 
validatorHandler(getUserSchema,'params'),
async (req, res,next) => {
  
  try {
    const {id} = req.params
  let deletUsers = await service.delete(id)
    res
    .status(200)
    .json({message:'Se ha eliminado con exito',data: deletUsers});

  } catch (error) {
  
    next(error)
   }
});

// router.patch('/:id', (req, res) => {
//   const {id} =req.params
//   const {name} = req.body
//   const user = users.find(i => i.id === parseInt(id))
//    user.name = name
//   res.json(user);
// });





export default router;