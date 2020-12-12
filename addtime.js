const Ingredient = require('./models/ingredient');
const mongoURI = 'mongodb://localhost/mongoRelationships';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);



const timeStamp = await Ingredient.update({},{ timestamp:true }, 
    (err, addTimestamp) =>{
    if (err) return done(err); 
      addTimestamp.save();
});