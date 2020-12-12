const mongoose = require('mongoose');


const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    unique:true,//avoid dups
  },
  origin: {
    type: String,
    default: '',
  },
},{timestamps:true});

module.exports = mongoose.model('Ingredient', ingredientSchema);