const { Pokemon } = require('../db/sequelize')
const pokemon = require('../models/pokemon')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => { 
        if(pokemon === null){
          const message = 'l identifient demande n existe pas'
          res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(err =>{
        const mesage = 'la requte na pas pu etre effectue veuillez ressayer dans quelques minutes '
        res.status(500).json({message, data:err})
      })
    
  })
}