const express=require('express');
const app=express();
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const expressLayouts=require('express-ejs-layouts');
const PORT=3000;

const mongoURI='mongodb://localhost:27017/mongoRelationships';
mongoose.connect(
    mongoURI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true,
        useFindAndModify:false,
      
    },
    ()=>{
        console.log('the connection with mongod is established')
    }
);
//configuration for the layout
app.set('view engine','ejs')

//middleware

app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//ROUTE
//Index Route
// ABOVE our app.get()
app.use('/albums', require('./controllers/albumsController'));
app.use('/users', require('./controllers/usersController'));
app.use('/ingredients', require('./controllers/ingredientsController'));
app.use('/foods', require('./controllers/foodsController'));
// option 2
// const usersController=require('./controllers/usersController')
// app.use('/users',usersController);

app.get('/', (req, res) => {
    res.render('home.ejs');
  });

  

app.listen(PORT,()=>{
    console.log(`Server is listening ${PORT}`);

})