const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
    return Pokemon.findByPk(id).then(pokemon => {
      if(pokemon === null){
        const message = 'le pokemon demande n existe pas'
        return res.status(404).json(message)
      }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(err =>{
      if(err instanceof ValidationError){
        return  res.status(400).json({message: err.message, data: err.data})

        }
        if(error instanceof UniqueConstraintError){
          return  res.status(400).json({message: error.message, data: error.data})
  
          }
      const message = 'le pokemon na pas pu etre modifie veuiller ressayer'
        res.status(500).json({message, data: err})
    })
     
  })
}