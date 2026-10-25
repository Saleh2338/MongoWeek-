
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/Week8';

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    gender: String,
    salary: Number,
    city: String
});

const Person = mongoose.model(
    'modelname',
    PersonSchema,
    'personCollection'
);

// Function to insert one document
async function insertOne() {

    const doc1 = new Person({
        name: 'Ahmed',
        age: 25,
        gender: 'Male',
        salary: 3000
    });

    const savedDoc = await doc1.save();

    console.log('One document inserted');
    console.log(savedDoc);
}

// Function to insert many documents
async function insertMany() {

    const manypersons = [
        { name: 'SimonNHQ', age: 42, gender: 'Male', salary: 3456, city: 'London' },
        { name: 'NeeshaNN', age: 53, gender: 'Female', salary: 1000 },
        { name: 'MaryNHQ', age: 27, gender: 'Female', salary: 5402, city: 'Birmingham' },
        { name: 'MikeNJQ', age: 40, gender: 'Male', salary: 4519, city: 'Manchester'}
    ];

    const result = await Person.insertMany(manypersons);

    console.log('Many documents inserted');
    console.log(result);
}
// Find all documents
async function findAll() {

    const docs = await Person.find({})
        .sort({ salary: 1 }) // sort by salary ascending
        .select('name salary age')
        .limit(100);

    console.log("Showing multiple documents");

    docs.forEach(doc => {
        console.log(doc.age, doc.name, doc.salary);
    });
}
async function deleteManyPersons() {
    const result = await Person.deleteMany({
        age: { $gte: 45 }
    });

    console.log("Deleted documents:", result.deletedCount);
}
async function updateManyPersons() {
    const result = await Person.updateMany(
        { gender: 'Female' },
        { $set: { salary: 5555 } }
    );

    console.log("Updated documents:", result.modifiedCount);
}
async function findByCity() {
    const docs = await Person.find({ city: 'London' });

    console.log("People living in London");

    docs.forEach(doc => {
        console.log(doc.name, doc.city);
    });
}
async function countDocuments() {
    const count = await Person.countDocuments();
    console.log("Total Documents Count:", count);
}
// Find females aged 30 or above
async function findFemalesOver30() {
    const givenAge = 30;

    const docs = await Person.find({
        gender: 'Female',
        age: { $gte: givenAge }
    })
        .sort({ salary: 1 })
        .select('name salary age')
        .limit(10);

    console.log("Showing females aged 30 or above");

    docs.forEach(doc => {
        console.log(doc.age, doc.name, doc.salary);
    });
}
async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Connected to ${MONGO_URI}`);

        await insertOne();
        await insertMany();
        await findAll();
        await findFemalesOver30();
        await countDocuments();
        await deleteManyPersons();
        await updateManyPersons();
        await findByCity();

    } catch (err) {
        console.error('Error:', err);

    } finally {
        await mongoose.connection.close();
        console.log('Connection closed');
    }
}

main();
