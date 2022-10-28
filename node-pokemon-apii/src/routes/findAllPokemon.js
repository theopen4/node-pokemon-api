const { Pokemon } = require('../db/sequelize')
const pokemon = require('../models/pokemon')
const {Op}= require('sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name){
      const name = req.query.name
      const limit =parseInt(req.query.limit) || 5
      if(name.length < 2){
        const message = "la recherche doit au moins contenir 2 lettres"
       return res.status(400).json({message})
      }
      return Pokemon.findAndCountAll({
              where:{
              name:{ //name est la propriete du modele pokemon
                [Op.like]:`%${name}%` // name est le criter e de recherche
              } 
            }, order:['name'],
            limit: limit
        })
       .then(({count,rows}) =>{
        const message = `il existe ${count} pokemon selon la recherche et ces ${name}`
        res.json({message: message, data:rows})
      })
       
    } else{
       Pokemon.findAll({order:['name']})
       .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée...'
        res.json( { message,pokemons} )
       })
       .catch((err)=>{
        const message='la requete n a pas pu etre effectue'
         res.status(500).json({message, data:err})  
        })

    }
   
  })
}