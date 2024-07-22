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
  Person.findById({_id:personId},(err,data)=>{
    if(err){
      return done(err)
    }
    done(null, data);
  })};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId},(err,person)=>{

    if(err){
      return done(err)
    }
    if(!person){
      const errorMessage="No person found"
      return done(new Error(errorMessage))
    }
    //save and update the person
    person.favoriteFoods.push(foodToAdd);
    person.save((error,updatedPerson)=>{
      if(err){
         return done(err)

      }
      done(null, updatedPerson)
    })
  })


};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findOneAndDelete({_id:personId},(err,updatedDoc)=>{
    if(err){
      return  done(err)
    }
    done(null,updatedDoc)

  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,data)=>{
    if(err){
      return done(err)
    }
    done(null,data)
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name:1}).limit(2).select({age:0}).exec((err,people)=>{
    if(err){return done(err)}
    done(null,people)
  
  })

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
