const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
      .catch(err =>{
        if(err instanceof ValidationError){
        return  res.status(400).json({message: err.message, data: err.data})

        }
        if (error instanceof UniqueConstraintError){
         return res.status(400).json({ message:message.error, data: error.data})
        }
        const message = 'le pokemon na pas pu etre ajoute  '
        res.status(500).json({message, data:err})
      })
  })
}