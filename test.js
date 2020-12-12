const mongoose = require('mongoose');

const Food = require('./models/food');
const Ingredient = require('./models/ingredient');

const mongoURI = 'mongodb://localhost:27017/mongoRelationships';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);

Food.findOne({ name: 'Quiche' })
  .populate('ingredients') // <- pull in ingredient data
  .exec((err, food) => {
    console.log('food line 18',food);
    if (err) {
      return console.log(err);
    }
    if (food.ingredients.length > 0) {
      console.log(`I love ${food.name} for the ${food.ingredients[0].name}`);
    } else {
      console.log(`${food.name} has no ingredients.`);
    }
    console.log(`what was that food? ${food}`);
  });