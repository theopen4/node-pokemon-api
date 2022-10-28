const express = require('express');
const morgan = require('morgan')
const sequelize = require('./src/db/sequelize')
const PokemonModels = require('./src/models/pokemon')
const {success,getUniqueId} = require('./helper.js') 
const favicon = require('serve-favicon')
const pokemons = require('./src/db/mock-pokemon');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

sequelize.initDb()

// on initialise nos point de terminaison

require('./src/routes/findAllPokemon')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)
app.use(({res})=>{
    const message = 'la ressource que vous demande est introuvable'
    res.status(404).json(message)
})







 app.listen(port,()=>console.log(`notre application nod est declarre sur: http://localhost:${port}`))
 /**partie exo  */
