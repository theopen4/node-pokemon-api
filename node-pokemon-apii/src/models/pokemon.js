const res = require("express/lib/response")
const { type } = require("express/lib/response")
const { Types } = require("mariadb")


const valideTypes = ['eau','feu','poisson','vol','insecte','normal','electrique','fee','plante']
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg:'ce nom est deja pris'
        },
        validate:
        { notEmpty: 
          {msg:'ce champ ne peut pas etre vide '},
          
         notNull: 
          {msg:'ce champ ne peut pas prendre la valeur null'}
          
          
         
        }
       
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:
        {
          isInt:{msg:"utuliser uniquement les nombre entiers pour les points de vie"},
          min:{
            args:[0],
            msg:'les points de vie doivent etre superieur ou egale a 0'
          },
          max:{
            args:[99],
            msg:'ce champ doit etre inferieur ou egale a 99'
          },
         
        
          notNull: 
           {msg:'ce champ ne peut pas etre vide'},
           
        }
        
       
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:'le champ ne prend que des valeurs en entiers'},
          notNull:{msg:'ce champ ne pas etre null'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl:{msg:' l url de  l image n est pas valide'},
          notNull:{msg:'ce champ ne peut pas etre null'}
        }
      },
      types: {

        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        validate:{
          isTypeValid(value){
            
           
          value.split(',').forEach(element => {
            if( valideTypes == element || void!valideTypes.includes(element) == false){
              
              
            } 
            
          });
            
            
            
            
            
            
            if(!value){
              throw new Error('un pokemon doit posseder un type')
            }
            if(value.split(',').length > 3){
              throw new Error('un pokemon ne peut pas posseder plus de trois type')

            }
           
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }