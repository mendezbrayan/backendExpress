import UsersRouter from '../router/user.router.js'
import ClientesRouter from '../router/clientes.router.js'
import NotaRouter from '../router/notas.router.js'
const RouterApi = (app) => {
   app.use('/users',UsersRouter)
   app.use('/clientes',ClientesRouter)
   app.use('/notas',NotaRouter)
}

export default RouterApi;