require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },
  age:{
    type:Number,
    required:true,
  },
  favoriteFoods:{
    type:[String],
    default:[]

  }

})
const Person = mongoose.model('Person',personSchema);

const arrayOfPeople = [
  {
    name: "Kushagra",
    age: 27,
    favoriteFoods: ["chinese", "indian"]
  },
  {
    name: "John Doe",
    age: 30,
    favoriteFoods: ["pizza", "burger", "pasta"]
  },
  {
    name: "Jane Smith",
    age: 25,
    favoriteFoods: ["sushi", "ramen", "salad"]
  },
  {
    name: "Emily Johnson",
    age: 22,
    favoriteFoods: ["tacos", "nachos", "quesadilla"]
  },
  {
    name: "Michael Brown",
    age: 35,
    favoriteFoods: ["steak", "fries", "ice cream"]
  }
];

console.log(arrayOfPeople);




const createAndSavePerson = (done) => {
  const person = new Person({

    name:"kushagravarma",
    age:27,
    favoriteFoods:["chinese","inidan"]
  })
  person.save((err,data)=>{
    if(err){
      console.log(err);

      return done(err);
    }
    done(null , data);


  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,people)=>{
    if(err){
      return done(err)
    }
    done(null,people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,data)=>{
    if(err){
      return done(err)
    }
    done(null, data);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if(err){
      return done(err)
    }
    done(null, data);
  })};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
