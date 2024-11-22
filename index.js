import express from "express";
import RouterApi from "./router/index.router.js";
import { boomErrorHandler, erroHandler, logErrors } from "./middlewares/errors.handlers.js";
import cors from 'cors'

const app = express();

const port = process.env.Port || 3000;

app.use(cors())

app.get("/", (req, res) => {
  res.send("hola mi server Express");
});

RouterApi(app);
app.use(logErrors)
app.use(boomErrorHandler)
app.use(erroHandler)
app.listen(port, () => {
  console.log(
    `Aplicacion Iniciada Correctamente Servidor en el Puerto ${port}`
  );
});
