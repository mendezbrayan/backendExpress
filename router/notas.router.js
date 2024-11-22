
import express  from "express";
import NotaService from "../services/notas.service.js"; 
import validatorHandler from '../middlewares/validator.handler.js'
import {createNotaSchema,getNotaSchema,UpdateNotaSchema } from "../schemas/notas.schema.js";
const router = express.Router();

const service = new NotaService()

router.use(express.json());

router.get("/", async(req, res,next) => {
  try {
    const nota = await service.all()

  res.json(nota);
  } catch (error) {
    next(error)

  }
  
});

router.get("/:id",
validatorHandler(getNotaSchema,'params'),
async (req, res,next) => {
  try {
    const {id} = req.params
      const nota = await service.findOne(parseInt(id))
      res.status(200).json(nota)

  } catch (error) {
    next(error)
    
  }
});

router.post('/', 
validatorHandler(createNotaSchema,'body'),
async(req, res,next) => {
  
 try {
    let newNota = await service.create(req.body)
  res.status(201).json(newNota);

  } catch (error) {
    next(error)
  }
 
});

router.put('/:id',
validatorHandler(getNotaSchema,'params'),
validatorHandler(UpdateNotaSchema,'body'),
 async (req, res,next) => {
  try {
    const {id} = req.params
   let notaUpdate = await service.update(parseInt(id),req.body)
  res.status(200).json(notaUpdate);

  } catch (error) {
    next(error)
    
  }
  
});

router.delete('/:id', 
validatorHandler(getNotaSchema,'params'),
async (req, res,next) => {
  
  try {
    const {id} = req.params
  let deletNota = await service.delete(id)
    res
    .status(200)
    .json({message:'Se ha eliminado con exito',data: deletNota});

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