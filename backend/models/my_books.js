// importer mogoose

const mongoose = require('mongoose');

// definere schema for mybooks
const myBooksSchema = new mongoose.Schema({



  // data tekst, feltet skal udfyldes, minimum længde

title: {
  type: String, 
  required:[true,"title"],
    minlength: [1, "Titel skal være mindst 1 tegn"]

},


description: {
    type: String,                                                   // Datatype: tekst
    required: [true, "Description er påkrævet"],                          // Feltet skal udfyldes
    minlength: [, "Titel skal være mindst 20 tegn"]                 // Minimum længde
},


// data tal, feltet skal udfyldes, mindste år og maks år

year: {
    type: Number,
    required: [true, "År er påkrævet"],
    min: [1920, "Film kan ikke være fra før 1920"],
    max: [2030, "film kan ikke fremtiden"]
},


//rated efter hvem det er tilladt for

 rated:{
   type: String,
   enum:["G", "PG", "PG-13", "R", "NC-17", "Not Rated"], // kun tilladt 
   default: "Not Rated"

 },

 //rating 1-10

  rating: {
      type: Number,
      min: [1, "Minimum 1 tegn"],
      max: [10, "Maksimum 10"]
  },




genres: {
    type: [String], // array af  tekst string
    validate: {
        validator: arr => arr.length > 0,
        message: "Der skal være mindst 1 genre" // fejlmeldelse valideter fejler
    }
},

// link til plakat

poster:{
  type: String, // url til filmens poster
  default:"" // hvis ingen url sættes til tom
}


}, {timestamps: true}) // tilføjer automatisk createdAt og updatedAt hvornår det blev oprettet og opdateret


// export  model til crud

module.exports=mongoose.model('Mybooks', myBooksSchema,'my_books')