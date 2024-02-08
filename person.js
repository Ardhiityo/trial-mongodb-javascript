const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/person')
    .then((result) => {
        console.log('connect to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

const personSchema = new Schema({
    firstName: String,
    lastName: String
});

personSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
})

personSchema.pre('save', async function () {
    this.firstName = 'Luna';
    this.lastName = 'Lovegood';
    console.log('Persiapan menyimpan data');
})

personSchema.post('save', async function () {
    console.log('Success menyimpan data');
})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    firstName: 'John',
    lastName: 'Smith'
});

console.log(person);

person.save().then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});;

// console.log(person.fullName);
// console.log(person.firstName);
// console.log(person.lastName);