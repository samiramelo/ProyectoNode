const express = require('express') //require es una función que permite cargar módulos de Node
const app = express() //Se inicializa express en una variable llamada app
const cors = require('cors');
require('dotenv').config()
const routes = require ('./src/routes/index')

//Configurar Express para interpretar JSON en los POST.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Configurar Express para permitir conexión a una dirección en particular.
//Para permitir a cualquier dirección, app.use(cors())
app.use(cors({
    origin: ['http://localhost:5173']
  }));
  
app.use(routes)

app.listen(process.env.PORT, () => {
console.log(`Example app listening on port ${process.env.PORT}`)
})