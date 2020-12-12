const ingredient = require("../models/ingredient");
//const ingrident = require("../models/ingredient");
//await mongoose.connection.dropCollection('ingredients');
const router = require("express").Router();

// NEW Ingrident FORM
router.get("/new", (req, res) => {
  //res.send('new ingredient')
  res.render("ingredients/new.ejs");
});
//Create new ingredient return on page view
// router.post('/', (req, res) => {
//     res.send(req.body);
//   });

//Create new ingredient to mongodb with async to avoid callback hell
router.post("/", async (req, res) => {
  try {
    let newIngredient = await ingredient.create(req.body);
    res.send(newIngredient);
  } catch (error) {
    res.send(error);
  }
});
// //index
// router.get('/',(req,res)=>{
//     Album.find({},(err,foundAllalbums)=>{
//         // console.log('all albums');
//         // res.send('all albums here')
//         if (err) res.send(err);
//         res.render('albums/index.ejs',{
//             data:foundAllalbums,

//         })
//     })
// })

module.exports = router;
