const ENV=process.env.NODE_ENV ;

require('dotenv').config({
  path : `.env.${ENV}`
});
const express = require("express");

const cors = require('cors');

const app = express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const errorController=require('./controllers/errorController');
const conversationRouter=require('./routers/conversationRouter');
const MONGO_DB_URL=`mongodb+srv://Codaholic:${process.env.MONGO_DB_USERNAME}@${process.env.MONGO_DB_PASSWORD}.hy9pkfk.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=root`;
// app.use(express.static(path.join(rootDir,"public")));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use((req, res, next) => {
  console.log("Request Recieved", req.url, req.method, req.body);
  next();
});
app.use('/api',conversationRouter);

// app.use("/host",hostRouter);
app.set("view engine","ejs");
app.set("views","views");

app.use(errorController.getError);
const PORT =3001;
mongoose.connect(MONGO_DB_URL).then(() => {
app.listen(PORT, () => {
  console.log(`Server running at : http://localhost:${PORT}/`);
});
})

