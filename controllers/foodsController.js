const router = require("express").Router();
const Food = require("../models/food");
const Ingredient = require("../models/ingredient");

router.get("/new", async (req, res) => {
  let allIngredient = await Ingredient.find({});
  res.render("foods/new.ejs", {
    ingredients: allIngredient,
  });
});
//index
router.get("/", async (req, res) => {
  let allFood = await Food.find();
  res.render("foods/index.ejs", {
    foods: allFood,
  });
});
//SHOW
router.get("/:id", async (req, res) => {
  let allIngredients = await Ingredient.find({});
  let foundFood = await Food.findById(req.params.id).populate({
    path: "ingredients",
    options: { sort: { name: "asc" } },
  });
  let ingredientsForChecklist = allIngredients.filter((ingredient) => {
    if (!foundFood.ingredients.map((food) => food.id).includes(ingredient.id)) {
      return ingredient;
    }
  });
  //res.send(foundFood)
  res.render("foods/show.ejs", {
    food: foundFood,
    ingredients: ingredientsForChecklist,
  });
});
//CREATE NEW FOOD
router.post("/", async (req, res) => {
  //passing the checkbox by objectId
  console.log(req.body);
  let food = await Food.create(req.body);
  res.redirect(`/foods/${food.id}`);
});

module.exports = router;
