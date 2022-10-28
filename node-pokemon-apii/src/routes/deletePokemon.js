const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon === null){
        const mesage = 'le pokemon demande n existe pas'
       return res.status(404).json(message)
      }
      const pokemonDeleted = pokemon;
     return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
    .catch(err =>{
      const message = 'le pokemon na pas pu etre supprime veuiller ressayer'
        res.status(500).json({mesage, data: err})
    })
  })
}