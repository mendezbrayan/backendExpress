
import express from 'express'
import ClienteService from '../services/clientes.service.js'
import validatorHandler from '../middlewares/validator.handler.js'
import { createClienteSchema,getClienteSchema,UpdateClienteSchema} from '../schemas/clientes.schema.js'
const router = express.Router()
const  service = new ClienteService()

router .use(express.json())

router.get('/',
async (req,res,next) => {
   try {
    const  clientes = await service.all()
      res.json(clientes)
   } catch (error) {
      next(error)
   }
})


router.post('/',
validatorHandler(createClienteSchema,'body'),
 async (req,res,next) => {
   try {
    let newCliente = await service.create(req.body)
  res.status(201).json(newCliente)
    
   } catch (error) {
    next(error)
   }
})

router.get("/:id",
validatorHandler(getClienteSchema,'params'),
async (req, res,next) => {
  try {
    const {id} = req.params
      const cliente = await service.findOne(parseInt(id))
      res.status(200).json(cliente)

  } catch (error) {
    next(error)
    
  }
});

router.put('/:id',
validatorHandler(getClienteSchema,'params'),
validatorHandler(UpdateClienteSchema,'body'),
 async (req, res,next) => {
  try {
    const {id} = req.params
   let clienteUpdate = await service.update(parseInt(id),req.body)
  res.status(200).json(clienteUpdate);

  } catch (error) {
    next(error)
    
  }
  
});

router.delete('/:id', 
validatorHandler(getClienteSchema,'params'),
async (req, res,next) => {
  
  try {
    const {id} = req.params
  let deletCliente = await service.delete(id)
    res
    .status(200)
    .json({message:'Se ha eliminado con exito',data: deletCliente});

  } catch (error) {
  
    next(error)
   }
});



export default router